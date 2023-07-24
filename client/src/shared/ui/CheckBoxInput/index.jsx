import './styles.css';

const CheckBoxInput = ({ tag, action, checked, out }) => {
  const className = out ? 'checkbox_input_out' : 'checkbox_input';
  const checkedInput = checked ? `${className} ${className}_checked` : className;

  return (
    <>
      <input onChange={action} type="checkbox" id={tag} hidden/>
      <label className={checkedInput} htmlFor={tag}>{tag}</label>
    </>
  );
};

export default CheckBoxInput;
