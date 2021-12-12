import axios from 'axios';
import { useState, useEffect } from 'react';

import CardFilterSupertype from './CardFilters/CardFilterSupertype';
import CardFilterType from './CardFilters/CardFilterType';

export default function CardFilter() {
  const [supertypes, setSupertypes] = useState(null);
  const [filteredSupertype, setfilteredSupertype] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get('https://api.pokemontcg.io/v2/supertypes');

        setSupertypes(data);
      } catch (error) {}
    })();
  }, []);

  const handleSupertypes = (supertype) => {
    const currentFilter = [...filteredSupertype];

    if (currentFilter.includes(supertype)) {
      const index = currentFilter.indexOf(supertype);
      currentFilter.splice(index, 1);
    } else {
      currentFilter.push(supertype);
    }

    setfilteredSupertype(currentFilter);
  };

  const [types, setTypes] = useState(null);
  const [filteredtype, setfilteredType] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get('https://api.pokemontcg.io/v2/types');

        setTypes(data);
      } catch (error) {}
    })();
  }, []);

  const handleTypes = (supertype) => {
    const currentFilter = [...filteredtype];

    if (currentFilter.includes(supertype)) {
      const index = currentFilter.indexOf(supertype);
      currentFilter.splice(index, 1);
    } else {
      currentFilter.push(supertype);
    }

    setfilteredType(currentFilter);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    console.log(e.target.Engergy.value);
  };

  return (
    <form onSubmit={handleFilter}>
      <CardFilterSupertype
        filterData={supertypes}
        setFilter={handleSupertypes}
      />
      <CardFilterType filterData={types} setFilter={handleTypes} />

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter
      </button>
    </form>
  );
}
