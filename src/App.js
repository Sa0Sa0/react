import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Write from './pages/Write';

function App() {
  return (
    <>
      <Routes>
			  <Route path="/" element={ <Main></Main> } />
        <Route path="/signup" element={ <SignUp></SignUp> } />
        <Route path="/login" element={ <Login></Login> } />
        <Route path="/write" element={ <Write></Write> } />
		  </Routes>
    </>
  );
}

export default App;
