import React from 'react'
import { PackageTracking } from './CartComponents'
import { func } from 'prop-types';

export function TrackPackage({order, actions=true}) {
    return (
        <td className='trackPackage tableItemHighlighted'>
            <span>{order.trackPackage.statusText}</span>
            <PackageTracking order={order} actions={actions}/>
        </td>
    )
}

export function TableItemUser({name}){
    return(
        <td className='tableItemHighlighted'>
            {name}
        </td>
    )
}

export function TableItemBoolean({condition}){
    return(
        <td className='tableItemHighlighted tableItemBoolean'
            style={{
                backgroundColor:condition?'#3b8c':''
            }}
        >
           <b>{condition.toString()}</b> 
        </td>
    )
}

export function TableItemDate({date='T.'}){
    return(
        <td className='tableItemDate'>
            <b>{date.split('T')[0]}</b>{' '}{date.split('T')[1].split('.')[0]}
        </td> 
    )
}

export function TableItemPrice({price}){
    return(
        <td>
            <b>$</b>{price}
        </td>
    )
}