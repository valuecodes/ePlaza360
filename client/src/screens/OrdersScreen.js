import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    saveOrder, 
    listOrders, 
    deleteOrder 
} from '../actions/orderActions';

export default function OrdersScreen(props) {

    const orderList = useSelector(state => state.orderList)
    const {loading, orders, error } = orderList

    const orderDelete = useSelector(state => state.orderDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listOrders())
    },[successDelete])
    
    const deleteHandler=(order)=>{
        dispatch(deleteOrder(order._id))
    }

    return (
        loading?<div>Loading...</div>:error?<div>{error}</div>:
        <div className='content contentMargined'>
            <div className='orderHeader'>
                <h3>Orders</h3>
            </div>
                <div className='orderList'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>USER</th>
                                <th>PAID</th>
                                <th>PAID AT</th>
                                <th>DELIVERED</th>
                                <th>DELIVERED AT</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>
                                <Order 
                                    order={order}
                                    deleteHandler={deleteHandler}    
                                />
                            )}
                        </tbody>  
                    </table>
                </div>                      
        </div>
    )
}

function Order({order, deleteHandler}){


    return(
        <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt}</td>
            <td>{order.totalPrice}</td>
            <td>{order.user.name}</td>
            <td>{order.isPaid}</td>
            <td>{order.paidAt}</td>  
            <td>{order.isDelivered}</td>
            <td>{order.deliveredAt}</td>  
            <td className='tdActions'>
                <Link to={`/order/${order._id}`} className='button secondary'>Details</Link>
                {' '}
                <button type='button' onClick={e =>deleteHandler(order)} className='button secondary'>Delete</button>
            </td>
        </tr> 
    )
}
