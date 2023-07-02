import './styles.css';

const Input = ({ value, onChange, name, placeholder }) => {
  return (
    <div className="post_input">
      <input
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        type={'text'}
      />
    </div>
  );
};

export default Input;
