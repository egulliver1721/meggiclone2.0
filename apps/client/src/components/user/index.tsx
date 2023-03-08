import { atom, useAtom } from 'jotai';
import style from './user.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export const loggedInAtom = atom(false);

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;A
  message?: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const User = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Validate the input and update the errors state
    try {
      const updatedValues = { ...formValues, [name]: value };
      schema.parse(updatedValues); // throws an error if the input is invalid
      setErrors({ ...errors, [name]: undefined });
    } catch (error: any) {
      const fieldError = error.errors[0]?.message;
      setErrors({ ...errors, [name]: fieldError });
    }
  };

  console.log(loggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleLogin = async () => {
    try {
      const baseURL = 'http://localhost:8080';
      const response = await axios.post(`${baseURL}/login`, formValues);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
      console.log('Login successful');
    } catch (error: any) {
      console.error(error);
      console.log('Login failed');
      if (error.formErrors) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };

  // api interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const handleLogout = () => {
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
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" value={formValues.email} onChange={handleInputChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button onClick={handleLogin}>Login</button>
            {errors.message && <span className="error">{errors.message}</span>}
            <p>Don't have an account?</p>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
