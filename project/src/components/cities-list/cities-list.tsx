import { Cities } from '../../types/cities';

function CitiesList({cities, active}: Cities) : JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => {
          const keyValue = `${city}`;

          return (
            <li key={keyValue} className="locations__item">
              <a className={`locations__item-link tabs__item ${ active === city ?'tabs__item--active': ''}`} href={`#${city.toLowerCase()}`}>
                <span>{city}</span>
              </a>
            </li>
          );
        })
      }
    </ul>
  );
}

export default CitiesList;
