import './styles.css';

const RadioInput = ({ id, title, action, checked, type }) => {
  const mainClassName = type === 'round' ? 'radio_input_round' : 'radio_input';
  const checkedInput = checked ? `${mainClassName} ${mainClassName}_checked` : mainClassName;

  return (
    <>
      <input onChange={action} type="radio" id={id} hidden/>
      <label className={checkedInput} htmlFor={id}>{title}</label>
    </>
  );
};

export default RadioInput;
