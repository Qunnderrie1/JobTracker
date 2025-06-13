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
          <Route path="/JobTrackerApp/signup" element={<SignUp />} />
          <Route path="/JobTrackerApp/login" element={<Login />} />
          <Route path='/JobTrackerApp/dashboard' element={<Protect />}  >
            <Route path="/JobTrackerApp/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/JobTrackerApp/dashboard/job/:id" element={<Dashboard />} />
          <Route path="/JobTrackerApp/dashboard/job" element={<Dashboard />} />
          <Route path="/JobTrackerApp/job" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
