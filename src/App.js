import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { API_URL } from './config';
import { UserContext } from './context/user.context';
import { ErrorContext } from './context/error.context';
import { MainLocationContext } from './context/mainLocation.context';
import { UserLocationContext } from './context/userLocation.context';

import NavigationBar from './components/Navbar/NavigationBar';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import LoadingComponent from './components/Loading';
import LandingPage from './components/LandingPage/LandingPage';
import UserProfile from './components/UserProfile/UserProfile';
import CardDiscover from './components/Card/CardDiscover';

function App() {
  const { setUser } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);
  const { mainLocation } = useContext(MainLocationContext);
  const { userLocation } = useContext(UserLocationContext);

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
  }, []);

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
      setErrors(null);
      navigate('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      let user = {
        userInput: e.target.userInput.value,
        password: e.target.password.value,
      };

      let response = await axios.post(`${API_URL}/signin`, user, {
        withCredentials: true,
      });
      setUser(response.data);
      setErrors(null);
      navigate('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
    setErrors(null);
    navigate('/');
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      let user = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
        currentPassword: e.target.currentPassword.value,
      };

      let response = await axios.patch(`${API_URL}/user/edit`, user, {
        withCredentials: true,
      });
      console.log(response);
      setUser(response.data);
      setErrors(null);
      navigate('/user');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const { pathname } = useLocation();

  if (getUser) {
    mainLocation.forEach((elem) =>
      pathname === elem.to ? (elem.current = true) : (elem.current = false)
    );
    userLocation.forEach((elem) =>
      pathname === elem.to ? (elem.current = true) : (elem.current = false)
    );
    return <LoadingComponent />;
  }

  return (
    <>
      <NavigationBar logout={handleLogout} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Auth */}
        <>
          <Route
            path="/signin"
            element={<SignIn handleSignIn={handleSignIn} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleSignUp={handleSignUp} />}
          />
        </>
        {/* Cards */}
        <>
          <Route path="/cards" element={<CardDiscover />} />
        </>
        {/* User */}
        <>
          <Route
            path="/user/settings"
            element={<UserProfile handleEdit={handleEdit} />}
          />
          <Route path="/user/lists" element={<UserProfile />} />
          <Route
            path="/user/cards"
            element={<UserProfile handleEdit={handleEdit} />}
          />
          <Route path="/user/:username" element={<LandingPage />} />
          <Route path="/user" element={<UserProfile />} />
        </>
      </Routes>
    </>
  );
}

export default App;
