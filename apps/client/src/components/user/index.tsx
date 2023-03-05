import { atom, useAtom } from 'jotai';
import style from './user.module.scss';

export const loggedInAtom = atom(false);

const User = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  console.log(loggedIn);

  const handleLogin = () => {
    // Perform login logic...
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic...
    setLoggedIn(false);
  };
  return (
    <div className={style.user}>
      <div className={style.container}>
        {loggedIn ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
      </div>
    </div>
  );
};

export default User;
