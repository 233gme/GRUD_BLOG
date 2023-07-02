import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from 'shared/config/redux/slices/posts';

const Post = ({ id, title, text, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemovePost = () => dispatch(fetchRemovePost(id));
  const onEditPost = () => navigate(`/posts/${id}/edit`);

  return (
    <div className="post">
      {/*isEditable={userData?._id === post.user._id}*/}
      {
        <>
          <Button action={onEditPost}>edit</Button>
          <Button action={onRemovePost}>delete</Button>
        </>
      }
      <Link to={`/posts/${id}`}>
        {title}
      </Link>
      <p>
        {text}
      </p>
    </div>
  );
};

export default Post;
