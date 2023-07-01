import { cloneElement } from 'react';
import './styles.css';

const IconButton = ({ action, children }) => {
  const props = {
    className: 'icon_btn'
  };
  const newProps = Object.assign({}, props);
  delete newProps.children;
  const newChildren = cloneElement(children, newProps);

  return (
    <button
      className={'icon_button'}
      onClick={action}
      type='button'
    >
      {newChildren}
    </button>
  );
};

export default IconButton;
