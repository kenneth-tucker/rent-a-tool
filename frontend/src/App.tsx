import './App.css';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  // Keep track of the logged in user
  // TODO replace with proper authentication
  const [user, setUser] = useState("");
  let location = useLocation();
  let navigate = useNavigate();

  // When the user is not logged in and attempts to view content
  // for a specific user, redirect to the login page
  useEffect(() => {
    if(user.length === 0 && 
      location.pathname !== "/login" && 
      location.pathname !== "/register") {
        navigate("/login");
    }
  }, [user, location, navigate]);
  
  // Render a header, content pane, and footer
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="App-content">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Welcome to Rent-a-Tool</h1>
              {user ? <p>Logged in as: {user}</p> : <p>Please log in or register.</p>}
            </div>
          } />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="App-footer">
        <p>© Kenneth Tucker</p>
      </footer>
    </div>
  );
}

export default App;