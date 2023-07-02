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
      {t('home')}
      <div className="nav_container">
        <div className="nav">
          <span>new</span>
          <span></span>
        </div>
        <div className="tags_container">
          #tags
        </div>
      </div>
      <div className="posts_container">
        {
          isPostLoading ? [...Array(5)] : posts.items.map((post, index) => {
            return isPostLoading
              ? <PostLoader key={index}/>
              : <Post key={post._id} id={post._id} text={post.text} title={post.title} user={post.user}/>;
          })
        }
      </div>
    </div>
  );
};

export default Home;
