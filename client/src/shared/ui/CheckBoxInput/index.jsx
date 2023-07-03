import './styles.css';

const CheckBoxInput = ({ tag, action, checked }) => {
  const checkedInput = checked ? 'checkbox_input checkbox_input_checked' : 'checkbox_input';

  return (
    <>
      <input onChange={action} type="checkbox" id={tag} hidden/>
      <label className={checkedInput} htmlFor={tag}>{tag}</label>
    </>
  );
};

export default CheckBoxInput;
