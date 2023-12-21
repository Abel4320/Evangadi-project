import React, { useEffect, useState,useContext } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import {UserContext} from '../../context/UserContext'
import axios from "axios"
const SignUp = ({ createAccount }) => {
        const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [passwordM, setPasswordM] = useState('');
    const [userData, setUserData] = useContext(UserContext)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };
   useEffect(() => {
        if (form.password && form.confirmPassword && form.password === form.confirmPassword) {
            setPasswordM('Passwords match.');
        } else {
            setPasswordM('');
        }
    }, [form.password, form.confirmPassword]);
  const handleSubmit = async (e) => {
         setError('');
        setPasswordMatch('');
        e.preventDefault();
              const { email, firstName, lastName, password, confirmPassword } = form;
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
         if (form.password !== form.confirmPassword) {
            setPasswordMatch('Passwords do not match.');
            return;
    }

    if (!form.agreeToTerms) {
            setError('You must agree to the privacy policy and terms of service.');
            return;
        }
          try {
      //sendindg data to be registered in a database
              await axios.post('http://localhost:5000/api/users', form); 
              //once registered sending user info to be logged in 
     const loginRes = await axios.post('http://localhost:5000/api/users/login', {
      email: form.email,
      password: form.password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem('auth-token', loginRes.data.token);
    navigate('/home');
          } catch (err) {
            setError(err.response.data.msg)
              console.log("the error is" , err.response.data.msg)
    // if (err.response && err.response.status === 401) {
    //   // Unauthorized: Invalid login credentials
    //   alert('Invalid email or password. Please try again.');
    // } else {
    //   // Other errors
    //   console.log('Error', err.message);
    //   alert('An error occurred. Please try again later.');
    // }
  }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='pb-[120px]'>
                  <div className='text-[25px] flex items-center justify-center'>
                    <h2>Join The Network</h2>
                  </div>
                  <div className='flex items-center justify-center mb-9'>
          Already have an account? <button onClick={(e) => { e.preventDefault(); createAccount(e); }} className='text-orange-500'>Sign in</button>
       
        </div>
        <div>
             <div className='mb-3 flex justify-center'>
             {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
                  <div>
                    <div>
                      <input onChange={handleChange}  className='w-[100%] h-[45px] border border-gray-500 rounded-md pl-2' placeholder="Email address" type="text" id="email" name="email" />
                    </div>
                    <div className='flex'>
                      <input onChange={handleChange} className='w-[50%] mt-5 h-[45px] border border-gray-500 rounded-md pl-2 mr-3' placeholder='First Name' type="text" id="firstName" name="firstName" />
                      <input onChange={handleChange} className='w-[50%] mt-5 h-[45px] border border-gray-500 rounded-md pl-2' placeholder='Last Name' type="text" id="lastName" name="lastName" />
                    </div>
                    <div>
                      <input onChange={handleChange} className='w-[100%] mt-5 h-[45px] border border-gray-500 rounded-md pl-2' placeholder='Password' type="password" id="password" name="password" />
                      <input onChange={handleChange} className='w-[100%] mt-5 h-[45px] border border-gray-500 rounded-md pl-2' placeholder='Confirm Password' type="password" id="confirmPassword" name="confirmPassword" />
                    </div>
                  </div>
                  <div className='flex items-center justify-center p-3 text-xs'>
          <a href="">I agree to the privacy policy and terms of service.</a>
          <input className='ml-1 w-8' type="checkbox" name="agreeToTerms" />
        </div>
        <div>
            {passwordMatch && <p className='text-red-500 mb-2'>{passwordMatch}</p>}
            {passwordM && <p className='text-green-400 mb-2'>{passwordM}</p>}
        </div>
                  <div className='mt-[px] bg-blue-500 h-[50px] w-[100%] flex items-center rounded-md justify-center text-white'>
                    <div>
                      <button type="submit" >Agree And Join</button>
                      </div>
                    </div>
                    <div className='flex justify-center p-5 '>
          <Link>
                        <a  onClick={createAccount} className='text-orange-500 '>
                      Already Have An Account?
                    </a>
          </Link>
                    </div>
                </form>
    </div>
  )
}
export default SignUp

