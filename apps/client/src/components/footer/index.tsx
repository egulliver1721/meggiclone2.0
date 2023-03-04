import { Link } from 'react-router-dom';
import style from './footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={style.grid}>
        <div className={style.griditem}>
          <Link className={style.link} to="/Terms">
            Terms and Conditions
          </Link>
        </div>
        <div className={style.griditem}>
          <Link className={style.link} to="/Privacy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
