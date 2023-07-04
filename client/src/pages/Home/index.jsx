import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from 'shared/config/redux/slices/posts';
import PostLoader from 'widgets/PostLoader';
import Post from 'widgets/Post';
import { PaginationPanel, SortPanel, TagsPanel } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import PageLoader from 'widgets/PageLoader';

const Home = () => {
  const { t } = useTranslation();
  const [checkedTags, setCheckedTags] = useState([]);
  const dispatch = useDispatch();
  const { posts, tags, sort, page } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isPostLoading = posts.status === 'loading';
  const isPostsFound = Boolean(posts.items.length);

  const fetchPostsWithArg = (arg) => {
    const stateArgs = {
      sort: sort.value,
      page: page.current
    };
    if (checkedTags.length) {
      stateArgs.tags = checkedTags.join(';');
    } else {
      if (stateArgs?.tags) {
        delete stateArgs.tags;
      }
    }
    const params = new URLSearchParams({ ...stateArgs, ...arg }).toString();
    dispatch(fetchPosts(params));
  };

  useEffect(() => {
    fetchPostsWithArg();
  }, [checkedTags]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return isPostLoading
    ? <PageLoader/>
    : (
      <div className="container">
        <div className={'nav_container'}>
          <SortPanel sort={sort.value} action={fetchPostsWithArg}/>
          <TagsPanel tags={tags} action={setCheckedTags} checked={checkedTags}/>
        </div>
        <div className="posts_container">
          {
            isPostsFound
              ? posts.items.map((post, index) => {
                return isPostLoading
                  ? <PostLoader key={index}/>
                  : <Post key={post._id} post={post} isEditable={userData?._id === post.user._id}/>;
              })
              : <div className={'no_posts_container'}>{t('noPosts')}</div>
          }
        </div>
        {
          isPostsFound
            ? <PaginationPanel pages={page} action={fetchPostsWithArg}/>
            : null
        }
      </div>
    );
};

export default Home;
