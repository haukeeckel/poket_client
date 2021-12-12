import CardFilter from './CardFilter';
import CardGrid from './CardGrid';

function CardDiscover() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <CardFilter />
      <CardGrid />
    </div>
  );
}

export default CardDiscover;
