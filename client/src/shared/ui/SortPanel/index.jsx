import './styles.css';
import { fetchPosts, fetchSortedPosts } from 'shared/config/redux/slices/posts';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RadioInput } from 'shared/ui';

const SortPanel = ({ sort }) => {
  const { t } = useTranslation('navPannel');
  const dispatch = useDispatch();
  const onGetAllPosts = () => dispatch(fetchPosts());
  const onGetNewPosts = () => dispatch(fetchSortedPosts('new'));
  const onGetMostViewedPosts = () => dispatch(fetchSortedPosts('views'));

  return (
    <div className="sort_container">
      <RadioInput
        title={t('all')}
        id={'sortContainer1'}
        action={onGetAllPosts}
        checked={sort === 'all'}
      />
      <RadioInput
        title={t('new')}
        id={'sortContainer2'}
        action={onGetNewPosts}
        checked={sort === 'new'}
      />
      <RadioInput
        title={t('most_viewed')}
        id={'sortContainer3'}
        action={onGetMostViewedPosts}
        checked={sort === 'views'}
      />
    </div>
  );
};

export default SortPanel;
