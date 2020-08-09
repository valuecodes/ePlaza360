import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import categories from './productCategories'
import axios from "axios";

export default function SideBar(props) {
    const history = useHistory()
    const [allProducts, setAllProducts]=useState([])
    const [currentProducts, setCurrentProducts]=useState([])
    const [brands, setBrands] = useState({})

    const productList = useSelector(state => state.productList)
    const { products } = productList

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.get('/api/products')
            setAllProducts(data)
        }
        fetchData()
    },[])

    useEffect(()=>{
        if(products){
            let data=products
            setCurrentProducts(data)
            let brand={}
            let min=Infinity;
            let max=0
            data.forEach(item =>{
                if(brand[item.brand]){
                    brand[item.brand]++
                }else{
                    brand[item.brand] = 1
                }
                if(item.price<min) min = item.price 
                if(item.price>max) max = item.price 
            })
            setBrands(brand)
            setOptions({...options, min, max, minPrice:min, maxPrice:max})                
        }
    },[products])

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState({
        Gender: '',
        Category: '',
        SubCategory: '',
        Brand:'',
        min:0,
        max:0,
        minPrice:0,
        maxPrice:0
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
                        <SideBarOption 
                            setOptions={setOptions} 
                            options={options} 
                            option={'Gender'} 
                            value={'Men'} 
                            allProducts={allProducts}
                        />
                        <SideBarOption setOptions={setOptions} options={options} option={'Gender'} value={'Women'} allProducts={allProducts}/>
                    </div>
                    <h3>Products found {currentProducts.length}</h3>
                    <SideSubBarHeader text={'Category'}/>
                    <div className='sideBarCategories'>    
                        <button
                            onClick={e =>{
                                options.Category=''
                                history.push(generateLink(options, 'Category',''))
                                setOptions({...options, Category:'',SubCategory:''})
                            }}
                        >Clear</button>  
                        {categories.map(category =>
                            <Category 
                                key={category.name} 
                                category={category} 
                                options={options} 
                                setOptions={setOptions}
                                allProducts={allProducts}
                                currentProducts={currentProducts}
                            />
                        )}
                    </div>
                    <SideSubBarHeader text={'Brands'}/>
                    <div className='sideBarBrands'>                      
                        <button
                            onClick={e =>{
                                options.Brand=''
                                history.push(generateLink(options, 'Brands',''))
                                setOptions({...options, Brand:''})
                            }}
                        >Clear</button>  
                        {Object.keys(brands).map(brand =>
                            <SideBarOption 
                                key={brand}
                                setOptions={setOptions} 
                                options={options} 
                                option={'Brand'} 
                                value={brand} 
                                allProducts={currentProducts}
                            /> 
                        )}
                    </div>
                    <SideSubBarHeader text={'Price Range'}/>
                    <div className='sideBarPriceRange'>
                        <p>Min <b>{options.minPrice}$</b></p>
                        <input 
                            type='range'
                            min={options.min}
                            max={options.max}
                            value={options.minPrice}
                            onChange={e => setOptions({...options, minPrice: e.target.value})}
                            onMouseUp={e => history.push(generateLink(options, 'price_from', options.minPrice))}
                        />
                        <p>Max <b>{options.maxPrice}$</b></p>
                        <input 
                            type='range'
                            min={options.min}
                            max={options.max}
                            value={options.maxPrice}
                            onChange={e => setOptions({...options, maxPrice: e.target.value})}
                            onMouseUp={e => history.push(generateLink(options, 'price_to', options.maxPrice))}
                        />
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

function Category({category, options, setOptions, allProducts, currentProducts}){
    let height=category.values.length*4+'rem'



    return(
        <div className='sideBarCategory'
            style={{height:category.name===options.Category?height:'3.5rem'}}
        >
            <SideBarOption 
                setOptions={setOptions} 
                options={options} 
                option={'Category'} 
                value={category.name} 
                allProducts={options.Brand?allProducts.filter(item => item.brand===options.Brand):allProducts}
            /> 
            {category.values.map(subCategory =>
                <SideBarSubOption key={subCategory} setOptions={setOptions} options={options} option={'SubCategory'} mainCategory={category.name} value={subCategory} allProducts={options.Brand?allProducts.filter(item => item.brand===options.Brand):allProducts}/>  
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

function SideBarOption({ setOptions, options, option, value, allProducts }){

    let count = allProducts.filter(product => product[option.toLowerCase()]===value).length

    return(
        <Link
            className='sideBarOption'
            onClick={e => 
                setOptions({...options, [option]:value, SubCategory:option==='Category'?'':options.SubCategory})}
            style={{
                backgroundColor:options[option]===value?'dimgray':'',
                color:options[option]===value?'white':'black'
            }}        
            to={
                generateLink(options, option, value)
            }
        >
            {value}    
            <div>{count}</div>
        </Link>        
    )
}

function SideBarSubOption({ setOptions, options, option, mainCategory, value, allProducts }){

    let count = allProducts.filter(product => product.subCategory===value).length

    return(
        <Link
            className='sideBarSubOption'
            onClick={e => setOptions({...options, [option]:value})}
            style={{
                backgroundColor:options[option]===value?'dimgray':'',
                color:options[option]===value?'white':'black'
            }}        
            to={generateLink(options, option, value)}
        >
            {value.replace('_','-')}    
            <div>{count}</div>
        </Link>        
    )
}

function generateLink(options, option, value){

    let category = option==='Category'?value:options.Category
    let subCategory = option==='SubCategory'?'-'+value:''
    if(subCategory==='' && options.SubCategory!=='') subCategory='-'+options.SubCategory
    if(option==='Category') subCategory=''

    let query='/'
    
    let brand = option==='Brand'?`&brand=${value.replace(' ','_')}`:''
    if(option!=='Brand' && options.Brand!=='') brand='&brand='+options.Brand.replace(' ','_')

    let priceFrom = option==='price_from'?`&price_from=${value}`:''
    if(option!=='price_from' && options.minPrice!==''&&Number(options.minPrice)!==options.min) priceFrom='&price_from='+options.minPrice
 
    let priceTo = option==='price_to'?`&price_to=${value}`:''
    if(option!=='price_to' && options.maxPrice!==''&&Number(options.maxPrice)!==options.max) priceTo='&price_to='+options.maxPrice

    query+=brand
    query+=priceFrom
    query+=priceTo
    if(query==='/') query=''

    return `/category/${category}${subCategory}${query}`
}