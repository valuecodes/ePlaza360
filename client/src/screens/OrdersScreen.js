import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    listOrders, 
    deleteOrder,
} from '../actions/orderActions';
import { 
    TrackPackage,
    TableTitle,
    TableHeader, 
    TableItemUser, 
    TableItemBoolean, 
    TableItemDate, 
    TableItemPrice, 
    TableItem 
} from '../components/TableComponents'

export default function OrdersScreen(props) {

    const orderList = useSelector(state => state.orderList)
    const {loading, orders, error } = orderList

    const orderStatus = useSelector(state => state.orderStatus)
    const {loading:loadingStatus, success: successStatus} = orderStatus


    const orderDelete = useSelector(state => state.orderDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listOrders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successDelete,successStatus])
    
    const deleteHandler=(order)=>{
        dispatch(deleteOrder(order._id))
    }

    return (
        <div className='content tableCenter'>
                <div className='orderList'>
                    <TableTitle text={'Orders'}/>    
                    <table className='table'>
                        <thead>
                            <tr className='tableHeader'>
                                <TableHeader text={'ID'}/>
                                <TableHeader text={'DATE'}/>
                                <TableHeader text={'TOTAL'}/>
                                <TableHeader text={'USER'}/>
                                <TableHeader text={'PAID'}/>
                                <TableHeader text={'PAID AT'}/>
                                <TableHeader text={'DELIVERED AT'}/>
                                <TableHeader text={'ORDER STATUS'}/>
                                <TableHeader text={'ACTIONS'}/>
                            </tr>
                        </thead>
                        <tbody>        
                            {loading||loadingDelete||loadingStatus?<div>Loading...</div>:error||errorDelete?<div>{error}</div>:
                            <>
                                {orders.map(order =>
                                    <Order 
                                        key={order._id}
                                        order={order}
                                        deleteHandler={deleteHandler}    
                                    />
                                )}
                            </>
                            }
                        </tbody>  
                    </table>
                </div>                      
        </div>
    )
}

function Order({order, deleteHandler}){
    return(
        <tr key={order._id}>
            <TableItem text={order._id}/>
            <TableItemDate date={order.createdAt} />
            <TableItemPrice price={order.totalPrice}/>
            <TableItemUser name={order.user.name}/>
            <TableItemBoolean condition={order.isPaid}/>
            <TableItemDate date={order.paidAt} />
            <TableItemDate date={order.deliveredAt} />
            <TrackPackage order={order}/>
            <td className='tableButtons'>
                <button className='button secondary'>
                    <Link to={`/order/${order._id}`} >Details</Link>    
                </button>
                {' '}
                <button type='button' onClick={e =>deleteHandler(order)} className='button secondary'>Delete</button>
            </td>
        </tr> 
    )
}
