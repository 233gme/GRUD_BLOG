import './styles.css';

const Button = ({ type = 'outline', action, children }) => {
  return (
    <button
      className={`button ${type}`}
      onClick={action}
      type='button'
    >
      {children}
    </button>
  );
};

export default Button;
