import LoadingComponent from '../../Loading';

function CardFilterSupertype({ filterData, setFilter }) {
  if (!filterData) {
    return <LoadingComponent />;
  }

  return (
    <fieldset className="m-5 inline-flex">
      <legend className="">Supertype</legend>
      {filterData.map((supertype) => (
        <div key={supertype} className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id={supertype}
              onChange={() => {
                setFilter(supertype);
              }}
              aria-describedby={supertype + 'description'}
              name="supertypes[]"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={supertype} className="font-medium text-gray-700">
              {supertype}
            </label>
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default CardFilterSupertype;
