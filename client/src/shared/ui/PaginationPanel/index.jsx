import { RadioInput } from 'shared/ui';
import { generateUniqueId } from 'shared/lib';
import { fetchPosts } from 'shared/config/redux/slices/posts';
import { useDispatch } from 'react-redux';
import PageLoader from '../../../widgets/PageLoader';

const PaginationPanel = ({ pages, loading }) => {
  const { total, current } = pages;
  const dispatch = useDispatch();
  const onPageHandler = (id) => () => dispatch(fetchPosts(`page=${id}`));

  return (
    <div className="pagination_container">
      {
        loading
          ? <PageLoader/>
          : ([...Array(total)].map((page, index) => (
            <RadioInput
              key={index}
              title={index + 1}
              type={'round'}
              id={generateUniqueId()}
              action={onPageHandler(index)}
              checked={parseInt(current) === index}
            />
          )))
      }
    </div>
  );
};

export default PaginationPanel;
