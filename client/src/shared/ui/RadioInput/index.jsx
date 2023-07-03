import './styles.css';

const RadioInput = ({ id, title, action, checked }) => {
  const checkedInput = checked ? 'radio_input radio_input_checked' : 'radio_input';

  return (
    <>
      <input onChange={action} type="radio" id={id} hidden/>
      <label className={checkedInput} htmlFor={id}>{title}</label>
    </>
  );
};

export default RadioInput;
