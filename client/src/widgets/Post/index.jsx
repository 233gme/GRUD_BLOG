import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from 'shared/config/redux/slices/posts';
import { IconButton, Image } from 'shared/ui';
import { ReactComponent as TrashIcon } from 'shared/assets/icons/trash.svg';
import { ReactComponent as EditIcon } from 'shared/assets/icons/edit.svg';
import { ReactComponent as EyeIcon } from 'shared/assets/icons/eye.svg';
import { ReactComponent as UserIcon } from 'shared/assets/icons/user-circle.svg';
import { ReactComponent as WatchIcon } from 'shared/assets/icons/watch.svg';

const Post = ({ post, isEditable }) => {
  const { _id: id, createdAt, imageUrl, tags, text, title, user, viewsCount } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemovePost = () => dispatch(fetchRemovePost(id));
  const onEditPost = () => navigate(`/posts/${id}/edit`);

  return (
    <div className='post_item'>
      <Image src={imageUrl} alt={title}/>
      {
        isEditable ? (
          <div className='post_item_btn'>
            <IconButton action={onEditPost}><EditIcon/></IconButton>
            <IconButton action={onRemovePost}><TrashIcon/></IconButton>
          </div>
        ) : null
      }
      <div className='post_item_desc'>
        <Link to={`/posts/${id}`}>{title}</Link>
        <div className={'post_item_desc_data'}>
          <span>
            <EyeIcon className='post_item_icon'/>{viewsCount}
          </span>
          <span>
            <UserIcon className='post_item_icon'/>{user.fullName}
          </span>
          <span>
            <WatchIcon className='post_item_icon'/>{new Date(createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
