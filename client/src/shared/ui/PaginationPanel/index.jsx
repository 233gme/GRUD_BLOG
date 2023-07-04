import { RadioInput } from 'shared/ui';
import { generateUniqueId } from 'shared/lib';

const PaginationPanel = ({ pages, action }) => {
  const { total, current } = pages;
  const onPageHandler = (page) => () => action({ page });

  return total > 1 ? (
    <div className="pagination_container">
      {
        ([...Array(total)].map((page, index) => (
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
  ) : null;
};

export default PaginationPanel;
