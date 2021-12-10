import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';

import { API_URL } from './config';
import { UserContext } from './context/user.context';
import { ErrorContext } from './context/error.context';
import SignIn from './components/Auth/SignIn';

function App() {
  const { user, setUser } = useContext(UserContext);
  const { errors, setErrors } = useContext(ErrorContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log(e.target);
    try {
      let newUser = {
        userInput: e.target.userInput.value,
        password: e.target.password.value,
      };

      let response = await axios.post(`${API_URL}/signin`, newUser, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/signin" element={<SignIn onSubmit={handleSignIn} />} />
      </Routes>
    </div>
  );
}

export default App;
