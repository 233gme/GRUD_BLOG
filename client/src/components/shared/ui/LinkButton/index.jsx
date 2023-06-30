import './styles.css';
import { Link } from 'react-router-dom';

const LinkButton = ({ path, type = 'btn', children }) => {
  return (
    <Link
      className={`link ${type}`}
      to={path}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
