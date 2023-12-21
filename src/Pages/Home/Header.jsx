import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Header.css';

const Header = ({ handleSignIn }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [isUser, setIsUser] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Check if the user is logged in when the component mounts and whenever userData changes
  useEffect(() => {
    const user = userData.user;
    const isLoggedIn = user !== undefined;
    setIsUser(isLoggedIn);
    if (!isLoggedIn) {
      localStorage.removeItem('auth-token'); // Ensure local storage is clear if not logged in
    }
  }, [userData]);

  // Set the user data from local storage on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      // Here you should decode your authToken to get user data and update the context
      // setUserData({ token: authToken, user: decodedUserData });
    }
  }, []);

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.removeItem('auth-token');
    setIsUser(false);
    navigate('/');
  };

  const handleSignInClick = () => {
    if (isUser) {
      logout();
    } else {
      handleSignIn();
    }
  };

  const toggleDropdown = () => {
    setIsActive(prevState => !prevState);
  };

  const getRoute = () => isUser ? '/home' : '/'
  return (
    <div>
          <header id="dropdownHeader" >
              <div className='header-items'>
                  <div className='m-5 w-[50%] '>
                  <Link to={getRoute()}>
                       <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt="" />
                   </Link>
                 </div>
              </div>
              <div className=' p-5 space-x-7 right-headers pl-[250px] '>
                 <Link  to={getRoute()}>Home</Link>
          <div className='' href="#">How it Works </div>
          <Link to={getRoute()}>
              {
            !isUser?(  <button  onClick={handleSignIn} className='bg-blue-500 hover:bg-orange-500 flex items-center h-[30px] text-white justify-center w-[150px] rounded-md' >Sign In</button>):(  <button    onClick={handleSignInClick} className='bg-orange-500 hover:bg-blue-500 flex items-center h-[30px] text-white justify-center w-[150px] rounded-md' >Sign Out</button>)
          }
          </Link>
              </div>
              <div onClick={toggleDropdown} className='mt-4 menu-icon text-orange-500  text-xl'>
                   &#9776;
              </div>
      </header>
          <div className={`dropdown-content ${isActive ? 'active' : ''}`}>
              <div className='p-4  '>
          <Link to={getRoute()}>
              <button onClick={(e) => {
            toggleDropdown(e)
          }
                   } >Home</button>
          </Link>
          <div className='mb-2 mt-2' href="#">How it Works </div>
          <button
            className='bg-blue-500 flex items-center  justify-center w-[120px] rounded-md'
              onClick={(e) => {
    // Call the prop function
    if (typeof handleSignIn === 'function') {
      handleSignIn(e);
    }
    // Call your additional function
                handleSignInClick(e);
                toggleDropdown(e)
  }}
          >
            {isUser ? 'Sign Out' : 'Sign In'}
          </button>
              </div>
      </div>
      {/* Additional overlay code if needed */}
    </div>
  );
};
export default Header;

