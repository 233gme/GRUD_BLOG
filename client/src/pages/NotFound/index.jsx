import './styles.css';
import LinkButton from 'shared/ui/LinkButton';

const NotFound = () => {
  return (
    <div className="container not_found">
      <h2>Page Not found!</h2>
      <LinkButton path={'/'}>🏇 to Main Page</LinkButton>
    </div>
  );
};

export default NotFound;
