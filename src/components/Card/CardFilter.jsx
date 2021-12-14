import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY } from '../../config';

export default function CardFilter(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCards([]);
  }, [query]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        let cancel;
        let res = await axios({
          method: 'GET',
          url: 'https://api.pokemontcg.io/v2/cards?',
          params: { q: `${query}`, page: pageNumber, pageSize: 12 },
          headers: { Authorization: API_KEY },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setCards((prevCards) => {
          return [...new Set([...prevCards, ...res.data.data])];
        });

        setHasMore(res.data.data.length > 0);

        setLoading(false);

        return () => cancel();
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setError(err);
      }
    })();
  }, [query, pageNumber]);

  return { loading, error, cards, hasMore };
}
