import './styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchPosts, fetchTags } from 'shared/config/redux/slices/posts';
import PostLoader from 'widgets/PostLoader';
import Post from 'widgets/Post';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div className="container">
      <div className="nav_container">
      </div>
      <div className="posts_container">
        {
          isPostLoading ? [...Array(5)] : posts.items.map((post, index) => {
            return isPostLoading
              ? <PostLoader key={index}/>
              : <Post key={post._id} post={post} isEditable={userData?._id === post.user._id}/>;
          })
        }
      </div>
    </div>
  );
};

export default Home;
