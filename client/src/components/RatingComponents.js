import React, { useState,useEffect } from 'react'

export function TotalRating({product}) {

    const [open, setOpen] = useState(false);
    const ratingPercent=Math.floor(product.rating*20)
    const stars=[1,2,3,4,5]

    return (
        <div className='subContainer'>
            <div className='subContainerHeader'>
                <h2>Rating</h2>
                <div className='totalRatingStars'>
                    <Rating rating={product.rating} size={1}/>
                </div>
                <div >
                    <h3 className='highlight' >{ratingPercent} %</h3> 
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
                <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
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
                        <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
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

    const starSize=`fa-${size}x`

    return (
        !rating? <div></div>:
        <div className='rating'>
            {stars.map(star => 
                <span>
                    <i className={
                        rating>=star?
                        `fa fa-star ${starSize}`:
                        rating >= star-0.5?
                        `fa fa-star-half-o ${starSize}`:
                        `fa fa-star-o ${starSize}`}>
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