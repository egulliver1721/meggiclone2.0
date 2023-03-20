import { atom, useAtom } from 'jotai';
import style from './user.module.scss';
import { FiMail, FiLock, FiEye } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import React from 'react';

export const loggedInAtom = atom(false);

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
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
            <h2 className={style.welcome}>Welcome</h2>
            <div className={style.loginInput}>
              <div className={style.email}>
                <label htmlFor="email" className={style.emailIcon}>
                  <FiMail />
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  className={style.input}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className={style.password}>
                <label htmlFor="password" className={style.passwordIcon}>
                  {' '}
                  <FiLock />{' '}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                  className={style.input}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                <span className={style.eyeIcon}>
                  <FiEye />
                </span>
              </div>
            </div>
            <div className={style.forgotPassword}>
              <Link to="/ForgotPassword">Forgot password?</Link>
            </div>
            <div className={style.loginBtn}>
              <button onClick={handleLogin}>LOGIN</button>
            </div>

            {errors.message && <span className="error">{errors.message}</span>}
            <div className={style.signup}>
              <p>Don't have an account?</p>
              <Link to="/Signup" className={style.signupLink}>
                Signup
              </Link>{' '}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
