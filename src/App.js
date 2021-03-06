import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { API_URL } from './config';
import { UserContext } from './context/user.context';
import { ErrorContext } from './context/error.context';

import NavigationBar from './components/Navbar/NavigationBar';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import LoadingComponent from './components/Loading';
import LandingPage from './components/LandingPage/LandingPage';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);

  const [getUser, setGettingUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });

        setGettingUser(false);
        setUser(data);
      } catch (err) {
        setGettingUser(false);
      }
    })();
  }, [setUser]);

  useEffect(() => {
    if (user) {
      navigate(`/user/`);
    } else {
      navigate('/');
    }
    console.log('hello');
  }, [user]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      let user = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      };

      let response = await axios.post(`${API_URL}/signup`, user, {
        withCredentials: true,
      });
      setUser(response.data);
      navigate('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      let user = {
        userInput: e.target.userInput.value,
        password: e.target.password.value,
      };

      let response = await axios.post(`${API_URL}/signin`, user, {
        withCredentials: true,
      });
      setUser(response.data);
      navigate('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
    navigate('/');
  };

  if (getUser) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <NavigationBar logout={handleLogout} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn onSubmit={handleSignIn} />} />
        <Route path="/signup" element={<SignUp onSubmit={handleSignUp} />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
