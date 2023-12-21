import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import "./Ask.css"
import { useNavigate ,Link} from 'react-router-dom';
const Ask = ({getQuestions}) => {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [codeBlock, setCodeBlock] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

const [userData, setUserData] = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
      if (!question.trim() || !description.trim()) {
      setError('Please fill in Your Question.');
      return;
    }
    try {
      if (!userData) {
        console.error('User or token not available');
        return;
      }
      const userId = userData.user.id;
      const tags = userData.user.display_name;
      // Send a POST request to your backend
      const response = await axios.post(
        'http://localhost:5000/api/question/ask',
        {
          userId,
          question,
          description,
          codeBlock,
          tags,
        },
        {
          headers: {
            'x-auth-token': userData.token,
          },
        }
      );
      // Handle the response from the backend
      console.log('Question submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
    navigate('/home')
  };
  return (
    <div className="">
      <div className="pt-[100px]">
        <div className='flex justify-center text-[25px] font-semibold '>
          <h1>Steps To Write A good Question</h1>
        </div>
        <div className='container flex justify-center'>
          <div>
                <li className="text-gray-700 mb-2">
          Summerize your problem in a one-line title.
        </li>
        <li className="text-gray-700 mb-2">
          Describe your problem in more detail.
        </li>
        <li className="text-gray-700 mb-2">
          Describe what you tried and what you expected to happen.
        </li>
        <li className="text-gray-700 mb-2">
          Review your question and post it to the site.
        </li>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div>
        <div className=' justify-center items-center question-container mb-[50px]'>
           <h1 className='flex justify-center text-[25px] font-semibold mb-3 pt-5 '>
       Ask a public question
        </h1>
           <div className='flex justify-center mb-3 '>
          <Link to={`/home`}><h1>Go to questions Page</h1></Link>
          </div>
          <div className='text-red-500 flex justify-center mb-3' > {error && <p className="text-red-500">{error}</p>}</div>
          <div className='flex justify-center'>
             <form className=''  onSubmit={handleFormSubmit}>
              <input
                style={{ width: '60vw', height:'5vh'}}
                
             className={`border ${error ? 'border-red-500' : 'border-gray-400'} rounded-md flex justify-center w-full mb-5`}
            placeholder='Title'
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
              <input
            style={{ width: '60vw' ,height:'' ,textAlign: 'left', verticalAlign: 'top' }}
            className={`border ${error?'border-red-500':' border-gray-400'} rounded-md pb-[200px]`}
            placeholder='Question Description'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <br />
        {/* Add similar input fields for codeBlock, tags */}
        <button  onClick={handleFormSubmit} className='bg-blue-500 hover:bg-orange-500  mt-5 mb-5 rounded-sm h-9 p-2 text-white' type="submit">Post your Question</button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;
