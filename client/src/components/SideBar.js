import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import categories from './productCategories'

export default function SideBar(props) {

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState({
        Gender: '',
        Category: '',
        SubCategory: ''
    })

    const {userSignin:{userInfo}} = useSelector(state => state)

    return (
        <>
        <aside className='sideBar'>
            <div className='sideBarToggle' onClick={e => setOpen(true)}>
                <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
            <div className='sideBarPage'
                style={{right:open?'-20rem':'25rem'}}
            >
                <div className='sideBarHeader'>
                    <h3>{`Welcome ${userInfo?userInfo.name:'Visitor'}`}</h3>    
                    <button
                        className='closeSideBar'
                        onClick={e => setOpen(false)}
                    >
                    <i className="fa fa-angle-left fa-3x" aria-hidden="true"></i>

                    </button>                    
                </div>
                <div className='sideBarContent'>
                    <h3>Categories</h3>
                    <SideSubBarHeader text={'Gender'}/>
                    <div className='sideBarGender'>    
                        <SideBarOption setOptions={setOptions} options={options} option={'Gender'} value={'Men'}/>
                        <SideBarOption setOptions={setOptions} options={options} option={'Gender'} value={'Women'}/>
                    </div>
                    <SideSubBarHeader text={'Category'}/>
                    <div className='sideBarCategories'>    
                        {categories.map(category =>
                            <Category key={category.name} category={category} options={options} setOptions={setOptions}/>
                        )}
                    </div>
                </div>
            </div>   
        </aside>            
        <div className='sideBarShader'
        onClick={e => setOpen(false)}
            style={{
                opacity:open?0.5:0,
                zIndex:open?1:-1
            }}
        ></div> 
        </>

    )
}

function Category({category, options, setOptions}){
    let height=category.values.length*4+'rem'
    return(
        <div className='sideBarCategory'
            style={{height:category.name===options.Category?height:'3.5rem'}}
        >
            <SideBarOption setOptions={setOptions} options={options} option={'Category'} value={category.name}/> 
            {category.values.map(subCategory =>
                <SideBarSubOption key={subCategory} setOptions={setOptions} options={options} option={'SubCategory'} mainCategory={category.name} value={subCategory}/>  
            )}
        </div>
    )
}

function SideSubBarHeader({text}){
    return(
        <h4 className='sideBarSubHeader'>
            {text}
        </h4>
    )
}

function SideBarOption({ setOptions, options, option, value }){
    return(
        <Link
            className='sideBarOption'
            onClick={e => 
                setOptions({...options, [option]:value, SubCategory:''})}
            style={{
                backgroundColor:options[option]===value?'dimgray':'',
                color:options[option]===value?'white':'black'
            }}        
            to={`/category/${value}`}
        >
            {value}    
        </Link>        
    )
}

function SideBarSubOption({ setOptions, options, option, mainCategory, value }){
    return(
        <Link
            className='sideBarSubOption'
            onClick={e => setOptions({...options, [option]:value})}
            style={{
                backgroundColor:options[option]===value?'dimgray':'',
                color:options[option]===value?'white':'black'
            }}        
            to={`/category/${mainCategory}-${value}`}
        >
            {value.replace('_','-')}    
        </Link>        
    )
}