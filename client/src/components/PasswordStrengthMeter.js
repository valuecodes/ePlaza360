import React,{useEffect, useRef, useState} from 'react'

export default function PasswordStrengthMeter({password, passwordFocus}) {
    
    const strengthMeter=useRef()
    const [weaknesses, setWeaknesses] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    })

    useEffect(()=>{
        strengthMeter.current = document.getElementsByClassName('passwordMeter')[0]
    },[])

    useEffect(()=>{
        let strength = calculateWeaknesses(password)
        strengthMeter.current.style.setProperty('--strength', strength)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[password])
    
  
    function calculateWeaknesses(value){
        strengthMeter.current.style.setProperty('--border', 0.3)
        let strength = 100
        let newWeaknesses={
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            specialChar: false
        }

        if(value.length<6){
            strength-=20
            newWeaknesses.length = true
        }  
        if(!value.match(/[A-Z]/g)){
            strength-=20
            newWeaknesses.uppercase = true
        } 
        if(!password.match(/[a-z]/)){
            strength-=20
            newWeaknesses.lowercase = true
        } 
        if(!password.match(/[0-9]/)){
            strength-=20
            newWeaknesses.number = true
        }
        if(!password.match(/[^0-9a-zA-Z\s]/g)){
            strength-=20
            newWeaknesses.specialChar = true
        } 
        setWeaknesses(newWeaknesses)
        return 100-strength
    }

    function getWeaknessColor(weakness){
        if(weaknesses[weakness]){
            return '#f7586d'
        }else{
            return '#6be585'
        }
    }

    return (
        <div 
            className='passwordStrengthMeter'
            style={{
                opacity:passwordFocus&&password.length>0?1:0,
                marginTop:passwordFocus&&password.length>0?'0':'-2rem'
            }}
        >
            <div className='passwordMeter'></div>            
            <div className='passwordWeaknesses'>
                <div 
                    className='passwordWeakess'
                    style={{backgroundColor: getWeaknessColor('length')}}
                >Length</div>
                <div className='passwordWeakess'
                    style={{backgroundColor: getWeaknessColor('uppercase')}}
                >Uppercase</div>
                <div className='passwordWeakess'
                    style={{backgroundColor: getWeaknessColor('lowercase')}}
                >Lowercase</div>
                <div className='passwordWeakess'
                    style={{backgroundColor: getWeaknessColor('number')}}
                >Number</div>
                <div className='passwordWeakess'
                    style={{backgroundColor: getWeaknessColor('specialChar')}}
                >Special</div>
            </div>            
        </div>
    )
}
