import { useEffect, useState } from "react";
import useSWR from "swr";

// function useFetch(url) {
//   const [data, setData] = useState();
//   useEffect(() => {
//     async function startFetching() {
//       console.log("fetching data");
//       const response = await fetch(url);
//       const newData = await response.json();

//       setData(newData);
//     }

//     startFetching();
//   }, [url]);

//   return data;
// }

// const fetcher = (url) => fetch(url).then((response) => response.json());

export default function Joke() {
  const [id, setId] = useState(0);

  // const data = useFetch(`https://example-apis.vercel.app/api/bad-jokes/${id}`);

  const { data, isLoading, isValidating, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  if (error) {
    return <h1>Oops, something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
