import cn from 'classnames';
import { Filter, FilterItemProp } from '../../types/offer';

function FilterSortItem(props: FilterItemProp) : JSX.Element {
  const {item, onItemClick, activeFilter} = props;

  const handleFilterItemClick = (filter: Filter) => {
    onItemClick(filter);
  };

  return (
    <li
      key={item.id.toString()}
      className={cn('places__option', {'places__option--active': activeFilter === item.type} )}
      onClick={() => handleFilterItemClick(item)}
    >
      {item.name}
    </li>
  );
}

export default FilterSortItem;
