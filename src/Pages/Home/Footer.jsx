import React from 'react'
import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYoutube, faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
      <div >
      <footer className=' text-white p-[50px] sm:flex sm:justify-between '>
        <div >
          <div className='w-[50%]'>
          <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png" alt=""/>
            <div className='pt-[20px]'>
           <ul>
      <li class="item">
        <a href="#">
        <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
      </li>
      <li class="item">
        <a href="https://www.linkedin.com/in/abel-tesfaye-97bb09288/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>
      </li>
      {/* <li class="item">
        <a href="#">
         <FontAwesomeIcon icon={faYoutube} className="icon" />
        </a>
      </li> */}
      <li class="item">
        <a href="#">
             <FontAwesomeIcon icon={faFacebook} className="icon" />
        </a>
      </li>
      <li class="item">
        <a href="https://github.com/Abel4320" target="_blank" >
             <FontAwesomeIcon icon={faGithub} className="icon" />
        </a>
      </li>
    </ul>
            </div>
        </div>
        </div>
        <div className=''>
          <div className='pt-[20px]'>
            <h1 className='mb-7 sm:text-[21px]'>Usefull Links</h1>
            <div className='text-sm text-gray-400 m-4 '>
              <p className='pb-3'>How it Works</p>
            <p className='pb-3'>terms of service</p>
            <p >Privacy Policy</p>
            </div>
          </div>
        </div>
        <div>
          <div className='pt-[20px]'>
            <h1 className='mb-7 sm:text-[21px]'>Contact Info</h1>
            <div className='text-sm text-gray-400'>
              <p className='pb-3'>Abel Tesfaye</p>
            <p className='pb-3'>abeltesfaye2093@gmail.com</p>
            <p>+1-667-280-0816</p>
          </div>
          </div>
        </div>
          </footer>
    </div>
  )
}
export default Footer
