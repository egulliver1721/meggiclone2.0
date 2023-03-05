import { atom, useAtom } from 'jotai';
import style from './user.module.scss';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const loggedInAtom = atom(false);

const User = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log(loggedIn);

  const handleLogin = async () => {
    try {
      const baseURL = 'http://localhost:8000';
      const response = await axios.post(`${baseURL}/login`, { email: username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
      console.log('Login successful');
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please try again.');
      console.log('Login failed');
    }
  };

  const handleLogout = () => {
    // Perform logout logic...
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className={style.user}>
      <div className={style.container}>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <h2>Login</h2>
            <label>Username:</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Don't have an account?</p>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
