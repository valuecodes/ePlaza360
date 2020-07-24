import React,{useState} from 'react'
import PasswordStrengthMeter from './PasswordStrengthMeter'

export function FormFieldHeader({text}){
    return (
        <li>
            <h3>{text}</h3>
        </li>
    )
}

export function FormField({name,type, value,setState}) {
    return (
        <li className='formField'>
            <input 
                required 
                spellCheck="false" 
                className='input' 
                placeholder=' ' 
                type={type} 
                name={name} 
                value={value}
                onChange={e => setState(e.target.value)}
            />
            <label className='label' htmlFor={name}>{name}</label>
        </li>
    )
}

export function FormFieldPassword(props) {

    const {
        setShowPassword,
        showPassword,
        setState,
        value,
        setPasswordFocus,
        label='Password'
    } = props

    return (
        <li className='formField'>
            <div className='showPassword' >
                <button type='button'
                    onMouseEnter={e => setShowPassword(true)}
                    onMouseLeave={e => setShowPassword(false)} >
                    <i className={showPassword?"fa fa-eye fa-2x":"fa fa-eye-slash fa-2x"} aria-hidden="true"></i>  
                </button>
            </div>
            <input value={value} required spellCheck="false" className='input' placeholder=' ' type={showPassword?'text':'password'} name='password'
                onChange={e => setState(e.target.value)}
                onFocus={e => setPasswordFocus(true)}
                onBlur={e => setPasswordFocus(false)}
            />
            <label className='label' htmlFor='password'>{label}</label>  
        </li>
    )
}

export function FormFieldRePassword(props) {

    const {
        equals,
        showPassword,
        setState,
        value,
        label='Re-Enter Password'
    } = props

    return (
        <li className='formField'>
            <input value={value} required spellCheck="false" className='input' placeholder=' ' type={showPassword?'text':'password'} name='rePassword' 
            onChange={e => setState(e.target.value)}
            style={{color: equals?'black':'#e45669'}}
            /> 
            <label className='label' htmlFor='rePassword'>{label}</label>
        </li>
    )
}

export function FormFieldChangePassword(props) {
    const [changePassword, setChancePassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const {
        password,
        setCurrentPassword,
        setNewPassword,
        newPassword,
        setNewRePassword,
        newRePassword
    } = props

    return (
        <>
            <li className='formField'>
                <div className='changePassword' >
                    <button type='button' className='button secondary' onClick={e => setChancePassword(!changePassword)}>
                        Change Password
                    </button>
                </div>
                <input readOnly value={password} required spellCheck="false" className='input' placeholder=' ' type={'password'} name='password' />
                <label className='label' htmlFor='password'>Password</label>  
            </li>
            {changePassword&&
                <div className='newPassword'>
                    <FormFieldRePassword 
                        label={'Enter Current Password'}
                        equals={true}
                        showPassword={false}
                        setState={setCurrentPassword}
                    />               
                    <FormFieldPassword 
                        label={'New Password'}
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
                        setState={setNewPassword}
                        setPasswordFocus={setPasswordFocus}
                    />
                    <PasswordStrengthMeter 
                        password={newPassword} 
                        passwordFocus={passwordFocus}
                    />
                    <FormFieldRePassword 
                        label={'Re-Enter New Password'}
                        equals={newPassword===newRePassword}
                        showPassword={showPassword}
                        setState={setNewRePassword}
                    />
                </div>
            }
        </>
    )
}

export function FormFieldText(props) {

    const {
        name,
        value,
        setState,
    } = props

    return (
        <li className='formField'>
            <label  htmlFor={name}>
                Description
            </label>
            <textarea placeholder=' ' className='textArea' name={name} value={value} onChange={e => setState(e.target.value)}>            
            </textarea>            

        </li>
    )
}

export function FormFieldButton({text}) {
    return (
        <li>
            <button type='submit' className='button primary fullWidth'>{text}</button>
        </li>
    )
}

export function FormFieldMessages(props){

    const {
        loading,
        error,
        success,
        formErrors=[]
    } = props
    
    return(
        <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {success && <div>Profile Saved Succesfully</div>}
            {formErrors.map(error =>
                <div>{error}</div>
            )}   
        </li>
    )
}

export function checkFormErrors(password, rePassword){
    if(password.length===0) return []
    let errors=[]
    if(password.length<6) errors.push('Password must be atleast 6 characters long')
    if(password!==rePassword) errors.push('Re-password is wrong')
    return errors
}