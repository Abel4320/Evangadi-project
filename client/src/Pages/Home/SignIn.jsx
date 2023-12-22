// Main.js
import React, { useEffect, useState,useContext,useRef } from 'react';
import './Main.css';
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { useNavigate,Link} from 'react-router-dom';
import { SignUp } from '../index';
import { Header } from '../index';
import "./SignIn.css"
const SignIn = () => {
  const emailInputRef = useRef(null);
    const [error, setError] = useState('');
  const navigate = useNavigate();
    const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [form, setForm] = useState(
    {
      // firstName: '',
      // lastName:'',
      email: '',
      password: '',
    }
  )
const [createAcc, setCreateAcc] = useState(true);
 const [userData, setUserData] = useContext(UserContext);
    useEffect(() => {
    checkLoggedIn()
  }, []);
  useEffect(() => {
    if(userData.user) navigate("/")
  }, [userData.user,navigate]);

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }
 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = form;

  // Check if email and password fields are filled
  if (!email || !password) {
    setError('All fields are required.');
    return;
  }

  try {
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
    if (err.response) {
      // Check for specific error status codes here
      if (err.response.status === 401) {
        setError('sever error please Try again');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      // Handle errors not related to the response
      setError('An error occurred. Please try again later.');
      console.log('Error', err.message);
    }
  }
};

 const checkLoggedIn = async () => {
  try {
    let token = localStorage.getItem('auth-token');
    if (!token) {
      // No token, user not logged in
      return;
    }
    const userRes = await axios.get("http://localhost:5000/api/users/all", {
      headers: { "x-auth-token": token },
    });
    setUserData({
      token,
      user: {
        id: userRes.data.data.user_id,
        display_name: userRes.data.data.user_name,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Unauthorized: Token is invalid or expired
      console.log('Unauthorized: Token is invalid or expired');
    } else {
      // Other errors
      console.log('Error in checkLoggedIn:', err.message);
    }
  }
  };
  const handleSignIn = () => {
    // Ensure that emailInputRef is defined before accessing its properties
    if (emailInputRef && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };
 const createAccount = (e) => {
    e.preventDefault()
    setCreateAcc(!createAcc);
  };
  return (
    <div>
      <div>
        <Header  handleSignIn={handleSignIn}  />
      </div>
      <div className='main'>
        <div className='container'>
          <div className='login-container p-9 mr-9 '>
             <div className='transition-container'>
              {createAcc ? (
                <form onSubmit={handleSubmit} className='pb-[120px]'>
                <div className='text-[25px] flex items-center justify-center'>
                  <h2>Login To Your Account</h2>
                </div>
                <div className='flex items-center justify-center mb-9'>
                    Don't have an account? <div><Link>
                    <a onClick={createAccount} className='text-orange-500'>Create a new account</a>
                    </Link></div>
                    
                  </div>
                       <div className='mb-3 flex justify-center'>
             {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
                <div>
                  <div>
                      <input ref={emailInputRef} onChange={handleChange}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        className={`w-[100%] h-[45px] border rounded-md pl-2 ${isEmailFocused ? 'focused' : ''}`}
                        placeholder="Email address"
                        type="text"
                        id="username"
                        name="email" />
                  </div>
                  <div>
                      <input onChange={handleChange}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className={`w-[100%] mt-5 h-[45px] border rounded-md pl-2 ${isPasswordFocused ? 'focused' : ''}`}
                        placeholder='Password'
                        type="password"
                        id="password"
                        name="password" />
                  </div>
                </div>
                <div className='text-orange-500 float-right mt-3 mb-3'>
                  <a href="">Forgot Password?</a>
                </div>
                <div >
                  <div>
                    <button onClick={handleSignIn}  className=' bg-blue-500 hover:bg-orange-500 h-[50px] w-[100%] flex items-center rounded-md justify-center text-white' type="submit">Login</button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <SignUp createAccount={createAccount} emailInputRef={emailInputRef} />
              </div>
            )}
            </div> 
          </div>
          <div className='right-side'>
            <h4 className='text-[20px]'>About</h4>
            <h1 className='text-orange-500'>Evangadi Networks</h1>
            <p className=''>
             
              Welcome to the Evangadi Tech, a dynamic platform facilitating the exchange of knowledge across diverse fields. Whether you're an expert, a curious learner, or someone seeking advice, our community-driven website connects you with knowledgeable individuals ready to share insights. Pose questions on an array of topics, engage with industry experts, and contribute your own solutions. Our user-friendly interface, personalized profiles, and respectful community culture make learning and networking a seamless experience. Join the Knowledge Exchange Hub to stay updated, solve challenges, and connect with like-minded individuals on a journey of continuous learning and discovery.
            </p>
            <div>
              <button className='mt-9 bg-orange-500 w-[50%] hover:bg-blue-500 h-9 text-white rounded-lg'>
                HOW IT WORKS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
