import Dashboard from './Pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Protect from './Pages/Protect';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/login" element={<Login /> } />
        <Route path='/dashboard' element={<Protect /> }  >
        <Route path="/dashboard" element={<Dashboard /> } />
        </Route>
        <Route path="/dashboard/job/:id" element={<Dashboard /> } />
        <Route path="/dashboard/job" element={<Dashboard /> } />
        <Route path="/job" element={<Dashboard /> } />
        <Route path="*" element={<NotFound /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
