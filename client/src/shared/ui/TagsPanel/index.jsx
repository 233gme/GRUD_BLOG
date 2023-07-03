import './styles.css';
import { CheckBoxInput } from '../index';

const TagsPanel = ({ tags, action, checked }) => {
  const onCheckTag = (tag) => () => {
    if (checked.includes(tag)) {
      action(prev => [...prev].filter(item => item !== tag));
    } else {
      action(prev => [...prev, tag]);
    }
  };

  return tags.status === 'loading'
    ? <span>Loading...</span>
    : (
      <div className={'tags_container'}>
        {
          tags.items.map(tag => (
              <CheckBoxInput
                key={tag}
                tag={tag}
                action={onCheckTag(tag)}
                checked={checked.includes(tag)}
              />
            )
          )
        }
      </div>
    );
};

export default TagsPanel;
