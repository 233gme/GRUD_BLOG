import './styles.css';
import { useTranslation } from 'react-i18next';
import { RadioInput } from 'shared/ui';
import { sortPanelData } from 'shared/lib';

const SortPanel = ({ sort, action }) => {
  const { t } = useTranslation('navPannel');
  const onGetSortedPosts = (value) => () => action({ sort: value });

  return (
    <div className="sort_container">
      {
        sortPanelData.map(({ title, value }) => {
          return (
            <RadioInput
              key={value}
              title={t(title)}
              id={'sortContainer1'}
              action={onGetSortedPosts(value)}
              checked={sort === value}
            />
          );
        })
      }
    </div>
  );
};

export default SortPanel;
