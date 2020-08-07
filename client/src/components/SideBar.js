import React,{ useState } from 'react'
import { Link } from 'react-router-dom'

export default function SideBar(props) {

    const [open, setOpen] = useState(true)
    const [options, setOptions] = useState({
        Gender: '',
        Category: ''
    })

    return (
        <>
        <aside className='sideBar'>
            <div className='sideBarToggle' onClick={e => setOpen(true)}>
                <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            </div>
            <div className='sideBarPage'
                style={{right:open?'-20rem':'25rem'}}
            >
                <div className='sideBarHeader'>
                    <h3>Categories</h3>
                    <button
                        className='closeSideBar'
                        onClick={e => setOpen(false)}
                    ><i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i>
                    </button>                    
                </div>
                <div className='sideBarContent'>
                    <SideSubBarHeader text={'Gender'}/>
                    <div className='sideBarGender'>    
                        <SideBarOption setOptions={setOptions} options={options} option={'Gender'} value={'Men'}/>
                        <SideBarOption setOptions={setOptions} options={options} option={'Gender'} value={'Women'}/>
                    </div>
                    <SideSubBarHeader text={'Category'}/>
                    <div className='sideBarCategories'>    
                        <SideBarOption setOptions={setOptions} options={options} option={'Category'} value={'Shoes'}/>
                        <SideBarOption setOptions={setOptions} options={options} option={'Category'} value={'Hats'}/>
                        <SideBarOption setOptions={setOptions} options={options} option={'Category'} value={'Pants'}/>
                        <SideBarOption setOptions={setOptions} options={options} option={'Category'} value={'Shirts'}/>
                    </div>
                </div>
            </div>   
        </aside>            
        <div className='sideBarShader'
            style={{
                opacity:open?0.5:0,
                zIndex:open?1:-1
            }}
        ></div> 
        </>

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
            onClick={e => setOptions({...options, [option]:value})}
            style={{backgroundColor:options[option]===value?'dimgray':'gray'}}        
            to={`/category/${value.toLowerCase()}`}
        >
            {value}    
        </Link>        
    )
}