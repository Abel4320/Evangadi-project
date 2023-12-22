// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, SignIn, HomePage, Ask, Answers} from './Pages/index';
function App() {
  return (
    <Router>
      <div className="App">
        <Header  />
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/ask" element={<Ask />} />
          <Route path="home/question/:question_id" element={<Answers/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
