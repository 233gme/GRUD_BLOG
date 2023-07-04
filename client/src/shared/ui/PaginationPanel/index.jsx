import { RadioInput } from 'shared/ui';
import { generateUniqueId } from 'shared/lib';
import PageLoader from 'widgets/PageLoader';

const PaginationPanel = ({ pages, loading, action }) => {
  const { total, current } = pages;
  const onPageHandler = (page) => () => action({ page });

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
