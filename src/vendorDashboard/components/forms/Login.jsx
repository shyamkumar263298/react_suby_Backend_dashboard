import React,{useState} from 'react'
import { API_PATH } from '../../data/ApiPath';

const Login = ({showWelcomeHandler}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const loginHandler = async  (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${API_PATH}vendor/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email, password})
            })
            const data = await response.json();
            console.log(data)

            if(response.ok){
                alert('Login success');
                localStorage.setItem('loginToken',data.token);
                setEmail('');
                setPassword('');
                showWelcomeHandler()
            }
            const vendorId = data.vendorId;
            console.log("data : ",JSON.stringify(data))

            console.log("vendorId : ",vendorId)

            const vendorResponse = await fetch(`${API_PATH}vendor/single-vendor/${vendorId}`);
            const vendorData = await vendorResponse.json();
            if(vendorResponse.ok){
                const vendorFirmId =  vendorData.vendorFirmId;
                const vendorFirmName = vendorData.vendor.firm[0].firmName;
                console.log("vendorFirmName : ",vendorFirmName);

                localStorage.setItem("firmName",vendorFirmName);
                localStorage.setItem("firmId",vendorFirmId);
                console.log(vendorFirmId);
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed login : ",JSON.stringify(error));

            
        }
    }
    return (
        <div className="loginSection">
            <form className='authForm' onSubmit={loginHandler}>
                <h3>Vendor Login</h3>
                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Enter your email' /><br />
                <label>Password</label>
                <input type="password" name="password" value={password}  onChange={(e) =>setPassword(e.target.value)} placeholder='Enter your password' /><br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
