import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveProductReview } from '../actions/productActions'
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { update } from '../actions/userActions';
import { Link } from 'react-router-dom'

export function TotalRating({product}) {

    const [open, setOpen] = useState(false);
    const ratingPercent=Math.floor(product.rating*20)

    return (
        <div className='subContainer'>
            <div className='subContainerHeader'>
                <h2>Rating</h2>
                <div className='totalRatingContainer'>
                    <TotalRatingBar rating={product.rating}/>
                </div>
                <div >
                    <h3 className='highlight' >{ratingPercent}%</h3> 
                </div>
                <ContainerOpenButton open={open} setOpen={setOpen} />
            </div>
            <div className='subContainerContent'
                style={{
                    height:open?'auto':0,
                    margin:open?'1rem':0
                }}
            > 
              <RatingStatistics product={product}/>  
            </div>
        </div>
    )
}

function ContainerOpenButton({open, setOpen}){
    return(
        <div>
            <button className='iconButton'
                onClick={e => setOpen(!open)}
            >
                <i className={`fa fa-${open?"minus":"plus"}-circle fa-2x`} aria-hidden="true"></i>
            </button>
        </div>
    )
}



function RatingStatistics({product}){

    const [ratings, setRatings] = useState([])
    
    useEffect(()=>{   

        let newRatings=[
            {id:5, name:'5 star',rate:0},
            {id:4, name:'4 star',rate:0},
            {id:3, name:'3 star',rate:0}, 
            {id:2, name:'2 star',rate:0},
            {id:1, name:'1 star',rate:0},   
        ]
        const total =  product.numReviews
        product.reviews.forEach(review =>{
            if(product.rating>0){
                newRatings[4-(review.rating-1)].rate+=(1/total)*100
            }
        });
        setRatings(newRatings)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className='ratingStatistics'>
            {ratings.map((rating, index) =>
                <RatingStat key={rating.id} rating={rating} index={index}/>
            )} 
        </div>
    )
}

function RatingStat({rating, index}){
    useEffect(() => {
        let ratebar=document.getElementsByClassName('rateBar')[index]
        ratebar.style.setProperty('--percentage', rating.rate+'%')  
         // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [])
    return(
        <div className='ratingStat'>
            <p>{rating.name}</p>
            <div className='rateBar'></div>
            <b>{Math.floor(rating.rate)} %</b>
        </div>
    )
}

export function CustomerReviews({product}) {

    const [open, setOpen] = useState(false);

    return (
        <div className='subContainer'>
            <div className='subContainerHeader'>
                <h2>Customer Reviews
                    <span className='highlight'> </span>
                </h2>
                <div></div>
                <div>
                    <h3 className='highlight'>{product.numReviews} ratings</h3>
                </div>
                <ContainerOpenButton open={open} setOpen={setOpen} />
            </div>
            <div className='subContainerContent '
                style={{
                    height:open?'auto':0,
                    margin:open?'1rem':0
                }}
            >
                <Reviews product={product}/>
            </div>
        </div>
    )
}

function Reviews({product}){
    return(
        <div className='customerReviews'>
            {product.reviews.map(review =>
                <li className='reviewItem' key={review._id}>
                    <div className='reviewUserMy'>
                        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                        <p>{review.name}</p>
                        <UserReview rating={review.rating}/>
                    </div>
                    <div className='reviewRating'>
                        <div className='reviewComment'>
                            <span>{parseDate(review.updatedAt)}</span>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                </li>
            )}   
        </div>  
    )
}

export function Rating({text='', rating=0, totalRating=false}) {
    
    const review=useRef()

    const ratingPercent=Math.floor(rating*20)

    useEffect(()=>{
       if(rating){
            review.current.style.setProperty('--rating-percent',ratingPercent+'%')           
       }
    },[rating,ratingPercent])

    return (
        !rating? <div></div>:
        <div className='productRating'>    
            <div className='rating'>
                <div 
                    className='reviewBar'
                    ref={review}
                    >  

                </div>
                <h3 className='ratingPercent'>{ratingPercent}%</h3>
                <span>{text}</span>
            </div>
        </div>
    )
}

export function TotalRatingBar({rating}){
    const review=useRef()

    const ratingPercent=Math.floor(rating*20)

    useEffect(()=>{
       if(rating){
            review.current.style.setProperty('--rating-percent',ratingPercent+'%')           
       }
    },[rating,ratingPercent])

    return (
        !rating? <div></div>:
        <div className='productRating'>    
            <div className='rating'>
                <div ref={review} className='reviewBar'>
                </div>
            </div>
        </div>
    )
} 

export function WriteReview({product}){

    let userInfo = useSelector(state => state.userSignin.userInfo)
    const userUpdate = useSelector(state => state.userUpdate)
    const { updatedUserInfo } = userUpdate
    
    if(updatedUserInfo){
        userInfo=updatedUserInfo
    }

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [reviewed, setReviewed] = useState(false)
    const [updatedAt, setUpdatedAt] = useState(null)
    const dispatch = useDispatch()

    const productReviewSave = useSelector(state => state.productReviewSave)
    const {success:productSaveSuccess} = productReviewSave

    useEffect(()=>{
        if(userInfo){
            let myReview = userInfo.reviews.find(review => review.productId===product)
            if(myReview){
                setRating(myReview.rating)
                setComment(myReview.comment)
                setReviewed(true)
                setUpdatedAt(myReview.updatedAt)
            }            
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[])

    useEffect(()=>{
        if(productSaveSuccess){
            dispatch({type: PRODUCT_REVIEW_SAVE_RESET})        
            dispatch(update({
                userId: userInfo._id, 
            }))      
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productSaveSuccess])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveProductReview(product, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
        
        setReviewed(true)
    }

    const changeRating=(rate)=>{
        if(!reviewed){
            setRating(rate)
        }
    }

    return(
        
        <div className='subContainer reviewContainer'>
            {!userInfo ? <div>Please <Link to='/signin'>Signin</Link> to write a review</div>
            :<>
            <div className='reviewContainerHeader'>
                <h2>
                    {reviewed?'My review':
                    'Write a customer review'}
                </h2>
            </div>         
        
            <div className='reviewUserMy'>
                <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                <p>{userInfo.name}</p>
                <OptionButtons 
                    changeRating={changeRating}
                    rating={rating}    
                    reviewed={reviewed}
                />
                <ContainerUpdateButton 
                    reviewed={reviewed} 
                    setReviewed={setReviewed}
                />        
            </div>              

            <div className='reviewCommentContainer'>
                {reviewed?
                        <li className='reviewComment'>
                            <span>{parseDate(updatedAt)}</span>
                            <p>{comment}</p>
                        </li>
                        :  
                        <form className='reviewCommentForm' onSubmit={submitHandler}>  
                                <textarea className='textArea' name='comment' value={comment} onChange={e => setComment(e.target.value)}/> 
                                <button type='submit' className='button primary submitButton'>Submit</button>         
                        </form>
                    }  
                </div>    
           </>}      
        </div>
    )
}

function parseDate(date){
    if(!date) return ''
    return `${date.split('T')[0].split('-').join('/')} ${'\u00A0'}${date.split('T')[1].substring(0,5)}`
}

function OptionButtons({changeRating, rating, reviewed}){

    function getColor(id){
        if(id===rating){
            return {
                backgroundColor:'rgba(255, 255, 255, 1)',
                color:'black',
                outline: 'none',
                boxShadow:'0 0 2px 1px rgba(0, 0, 0, 0.6)'                
            }
        }
    }

    return(
        <div className='ratingBar'>
            <div className='optionButtons'>
                <button className='optionButton' disabled={reviewed} style={getColor(1)} onClick={e => changeRating(1)} type='button'>1</button>
                <button className='optionButton' disabled={reviewed} style={getColor(2)} onClick={e => changeRating(2)} type='button'>2</button>
                <button className='optionButton' disabled={reviewed} style={getColor(3)} onClick={e => changeRating(3)} type='button'>3</button>
                <button className='optionButton' disabled={reviewed} style={getColor(4)} onClick={e => changeRating(4)} type='button'>4</button>
                <button className='optionButton' disabled={reviewed} style={getColor(5)} onClick={e => changeRating(5)} type='button'>5</button>
            </div>
        </div>
    )
}

function ContainerUpdateButton({reviewed, setReviewed}){
    return(
        <div className='updateButton'>
            <button className='iconButton'
                onClick={e => setReviewed(!reviewed)}
            >
                <i className="fa fa-pencil fa-1x" aria-hidden="true"></i>
            </button>
        </div>
    )
}

function UserReview({ rating }){

    function getColor(id){
        if(id===rating){
            return {
                backgroundColor:'rgba(255, 255, 255, 1)',
                color:'black',
                outline: 'none',
                boxShadow:'0 0 2px 1px rgba(0, 0, 0, 0.6)'                
            }
        }
    }

    return(
        <div className='ratingBar'>
            <div className='optionButtons'>
                <div className='optionButton' style={getColor(1)}>1</div>
                <div className='optionButton' style={getColor(2)}>2</div>
                <div className='optionButton' style={getColor(3)}>3</div>
                <div className='optionButton' style={getColor(4)}>4</div>
                <div className='optionButton' style={getColor(5)}>5</div>
            </div>
        </div>
    )
}
