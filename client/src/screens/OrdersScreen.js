import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    listOrders, 
    deleteOrder,
} from '../actions/orderActions';
import { TrackPackage, TableItemUser, TableItemBoolean, TableItemDate, TableItemPrice } from '../components/TableComponents'

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
        loading||loadingDelete||loadingStatus?<div>Loading...</div>:error||errorDelete?<div>{error}</div>:

        <div className='content tableCenter'>
                <div className='orderList'>
                     <div className='tableHeader'>
                        <h3>Orders</h3>
                    </div>       
                    <table className='table'>
                        <thead>
                            <tr  className='tableHeader'>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>USER</th>
                                <th>PAID</th>
                                <th>PAID AT</th>
                                {/* <th>DELIVERED</th> */}
                                <th>DELIVERED AT</th>
                                <th>ORDER STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>
                                <Order 
                                    key={order._id}
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
            <TableItemDate date={order.createdAt} />
            <TableItemPrice price={order.totalPrice}/>
            <TableItemUser name={order.user.name}/>
            <TableItemBoolean condition={order.isPaid}/>
            <TableItemDate date={order.paidAt} />
            {/* <TableItemBoolean condition={order.isDelivered}/> */}
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
