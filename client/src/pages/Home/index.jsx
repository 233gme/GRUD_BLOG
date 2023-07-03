import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from 'shared/config/redux/slices/posts';
import PostLoader from 'widgets/PostLoader';
import Post from 'widgets/Post';
import { PaginationPanel, SortPanel, TagsPanel } from 'shared/ui';

const Home = () => {
  const [checkedTags, setCheckedTags] = useState([]);
  const dispatch = useDispatch();
  const { posts, tags, sort, page } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isPostLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div className="container">
      <div className={'nav_container'}>
        <SortPanel sort={sort.value}/>
        <TagsPanel tags={tags} action={setCheckedTags} checked={checkedTags}/>
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
      <PaginationPanel pages={page} loading={isPostLoading}/>
    </div>
  );
};

export default Home;
