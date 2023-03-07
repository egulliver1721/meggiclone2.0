import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const baseURL = 'http://localhost:8080'; // Add base URL
      await axios.post(`${baseURL}/signup`, { email, password, firstName, lastName }); // Include base URL in request
      console.log('User created successfully');
    } catch (error) {
      console.error(error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <button onClick={handleSignup}>Signup</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
