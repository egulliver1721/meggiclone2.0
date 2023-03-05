import { atom, useAtom } from 'jotai';
import style from './user.module.scss';
import { useState } from 'react';
import axios from 'axios';

export const loggedInAtom = atom(false);

const User = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log(loggedIn);

  const handleLogin = async () => {
    try {
      await axios.post('/login', { username, password });
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    // Perform logout logic...
    setLoggedIn(false);
  };
  return (
    <div className={style.user}>
      <div className={style.container}>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
