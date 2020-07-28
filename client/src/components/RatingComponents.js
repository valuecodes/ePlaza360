import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveProductReview } from '../actions/productActions'
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';


export function TotalRating({product}) {

    const [open, setOpen] = useState(false);
    const ratingPercent=Math.floor(product.rating*20)

    return (
        <div className='subContainer'>
            <div className='subContainerHeader'>
                <h2>Rating</h2>
                <div className='totalRatingStars'>
                    <Rating rating={product.rating} size={2}/>
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
                <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
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
                    <div className='reviewUser'>
                        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                        <p>{review.name}</p>
                        <span>{review.createdAt.substring(0, 10)}</span>
                    </div>
                    <div className='reviewRating'>
                        <Rating rating={review.rating} />
                        <p>{review.comment}</p>
                    </div>
                </li>
            )}   
        </div>  
    )
}

export function Rating({text='', rating=0, size=1}) {

    const stars=[1,2,3,4,5]
    const [starSize, setStarSize] = useState(`fa-1x`)

    useEffect(()=>{
        window.addEventListener("resize", displayWindowSize);
        return () => window.removeEventListener("resize", displayWindowSize)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        let ssize=size
        if(window.innerWidth<1100){
            ssize=1
        } 
        setStarSize(ssize)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function displayWindowSize(){
        if(window.innerWidth<1100){
            setStarSize(1)
        }
    }

    return (
        !rating? <div></div>:
        <div className='rating'>
            {stars.map(star => 
                <span key={star}>
                    <i className={
                        rating>=star?
                        `fa fa-star fa-${starSize}x`:
                        rating >= star-0.5?
                        `fa fa-star-half-o fa-${starSize}x`:
                        `fa fa-star-o fa-${starSize}x`}>
                    </i>                      
                </span> 
            )}    
            <span>{text}</span>
        </div>
    )
}

export function WriteReview(props){
    
    const {
        submitHandler,
        rating,
        setRating,
        comment,
        setComment
    } = props

    const [open, setOpen] = useState(false);

    function getColor(id){
        if(id===rating){
            return {
                backgroundColor:'rgba(255, 0, 0, 0)',
                outline: 'none',
                boxShadow:'0 0 2px 1px rgba(0, 0, 0, 0.6)'                
            }
        }
    }

    return(
        <div className='subContainer'>
            <div className='subContainerHeader'>
                <h2>Write a customer review</h2>
                <div></div>
                <div></div>
                <ContainerOpenButton open={open} setOpen={setOpen} />
            </div>
            <div className='subContainerContent'
                style={{
                    height:open?'auto':0,
                    margin:open?'1rem':0
                }}
            > 
                <form onSubmit={submitHandler}>      
                    <li>
                        <label htmlFor='rating'>
                            Rating
                        </label>
                        <div className='optionButtons'>
                            <button style={getColor(1)} onClick={e => setRating(1)} type='button'>Poor</button>
                            <button style={getColor(2)} onClick={e => setRating(2)} type='button'>Fair</button>
                            <button style={getColor(3)} onClick={e => setRating(3)} type='button'>Good</button>
                            <button style={getColor(4)} onClick={e => setRating(4)} type='button'>Very Good</button>
                            <button style={getColor(5)} onClick={e => setRating(5)} type='button'>Excellent</button>
                        </div>
                    </li>
                    <li className='reviewComment'>
                        <label htmlFor='comment'>Comment</label>
                        <textarea className='textArea' name='comment' value={comment} onChange={e => setComment(e.target.value)}/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>Submit</button>
                    </li>
                </form>              
            </div>        
        </div>
    )
}

export function WriteReviewSlim(props){
    
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const userSignin = useSelector(state => state.userSignin)
    const userInfo = userSignin.userInfo

    const [open, setOpen] = useState(false);
    // useEffect(()=>{
    //     if(productSaveSuccess){
    //         alert('Review submitted succesfully')
    //         setRating(0)
    //         setComment('')
    //         dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[productSaveSuccess])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveProductReview(product, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
    }
    const{
        product
    } = props
    function getColor(id){
        if(id===rating){
            return {
                backgroundColor:'rgba(255, 0, 0, 0)',
                outline: 'none',
                boxShadow:'0 0 2px 1px rgba(0, 0, 0, 0.6)'                
            }
        }
    }

    return(
        <div>
            <div className='subContainer myRating'>
                <div className='subContainerContent'> 
                    <form onSubmit={submitHandler}>      
                        <li className='liSlim'>
                            <label htmlFor='rating'>
                                My Rating
                            </label>
                            <div className='optionButtons'>
                                <button style={getColor(1)} onClick={e => setRating(1)} type='button'>Poor</button>
                                <button style={getColor(2)} onClick={e => setRating(2)} type='button'>Fair</button>
                                <button style={getColor(3)} onClick={e => setRating(3)} type='button'>Good</button>
                                <button style={getColor(4)} onClick={e => setRating(4)} type='button'>Very Good</button>
                                <button style={getColor(5)} onClick={e => setRating(5)} type='button'>Excellent</button>
                            </div>
                        </li>
                        <li className='reviewCommentSlim'>
                            <label htmlFor='comment'>Comment</label>
                            <textarea className='textArea' name='comment' value={comment} onChange={e => setComment(e.target.value)}/>
                            <button type='submit' className='button primary'>Submit</button>
                        </li>
                    </form>              
                </div>        
            </div>
        </div>
    )
}