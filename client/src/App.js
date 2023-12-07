import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './components/Login';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedin, setLogin] = useState(false);
  useEffect(()=> {
    setLogin(localStorage.getItem('_id') ? true : false)
  },[isLoggedin])
  
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={isLoggedin ? <Home /> : <Login />} />
        <Route path='/' element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
