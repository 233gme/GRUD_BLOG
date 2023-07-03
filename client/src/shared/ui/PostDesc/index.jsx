import './styles.css';
import { ReactComponent as EyeIcon } from 'shared/assets/icons/eye.svg';
import { ReactComponent as UserIcon } from 'shared/assets/icons/user-circle.svg';
import { ReactComponent as WatchIcon } from 'shared/assets/icons/watch.svg';

const PostDesc = ({ viewsCount, userName, createdAt }) => {
  return (
    <div className={'post_desc_data'}>
      <span><EyeIcon className='post_desc_icon'/>{viewsCount}</span>
      <span><UserIcon className='post_desc_icon'/>{userName}</span>
      <span><WatchIcon className='post_desc_icon'/>{new Date(createdAt).toDateString()}</span>
    </div>
  );
};

export default PostDesc;
