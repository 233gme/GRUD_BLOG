import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from 'shared/config/redux/slices/posts';
import { IconButton, Image, PostDesc } from 'shared/ui';
import { ReactComponent as TrashIcon } from 'shared/assets/icons/trash.svg';
import { ReactComponent as EditIcon } from 'shared/assets/icons/edit.svg';

const Post = ({ post, isEditable }) => {
  const { _id: id, createdAt, imageUrl, title, user, viewsCount } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemovePost = () => dispatch(fetchRemovePost(id));
  const onEditPost = () => navigate(`/posts/${id}/edit`);
  const newTitle = (text) => {
    if (text.length > 27) {
      return `${text.substring(0, 29)}...`;
    } else {
      return text;
    }
  };

  return (
    <div className='post_item'>
      <div className="post_item_img">
        <Image src={imageUrl} alt={title}/>
      </div>
      {
        isEditable ? (
          <div className='post_item_btn'>
            <IconButton action={onEditPost}><EditIcon/></IconButton>
            <IconButton action={onRemovePost}><TrashIcon/></IconButton>
          </div>
        ) : null
      }
      <div className='post_item_desc'>
        <Link to={`/posts/${id}`}>{newTitle(title)}</Link>
      </div>
      <PostDesc
        userName={user.fullName}
        createdAt={createdAt}
        viewsCount={viewsCount}
      />
    </div>
  );
};

export default Post;
