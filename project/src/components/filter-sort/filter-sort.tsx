import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Filter, FilterProp } from '../../types/offer';
import { FILTER_LIST } from '../../consts';
import FilterSortItem from '../filter-sort-item/filter-sort-item';
import React from 'react';

function FilterSort({activeFilter, onFilterItemClick}: FilterProp) : JSX.Element {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>('');

  const handleFilterClick = () => {
    setOpenFilter(!openFilter);
  };

  const onItemClick = useCallback((item: Filter) => {
    if (item.type !== activeFilter) {
      onFilterItemClick(item);
    }
  }, [activeFilter, onFilterItemClick]);

  useEffect(() => {
    const titleNew = FILTER_LIST.find((item) => item.type === activeFilter);

    setTitle(titleNew?.name);
  }, [activeFilter]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleFilterClick}>
        {title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom', {'places__options--opened': openFilter} )}>
        {
          FILTER_LIST.map((item)=>(
            <FilterSortItem key={item.id.toString()} item={item} activeFilter={activeFilter} onItemClick={onItemClick}/>
          ))
        }
      </ul>
    </form>
  );
}

export default React.memo(FilterSort, (prevProps, nextProps) => prevProps.activeFilter === nextProps.activeFilter);
