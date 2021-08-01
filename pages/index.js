import React, { useState } from "react";
import styled from "styled-components";
import { Table } from "../components/Table";

export default function Home({ data }) {
  const [albums, setAlbums] = useState([]);
  const [timeoutValue, setTimeoutValue] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Fetches data from http://localhost:3000/api/table
   * @param {boolean} isSuccess - Boolean value to fetch data successfully or with an error
   */
  const fetchData = async (isSuccess) => {
    setError(false);
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/table");
    const apiData = await res.json();
    await new Promise((resolve) => setTimeout(resolve, timeoutValue));

    setLoading(false);

    // If isSuccess is false, return error as true
    if (!isSuccess) return setError(true);

    return setAlbums(apiData.albums);
  };

  return (
    <div>
      {/* Server rendered Table */}
      <Container>
        <Table albums={data.albums} />
      </Container>

      {/* Manual API Call Table*/}
      <Container>
        <button onClick={() => fetchData(true)}>Fetch Data</button>
        <button onClick={() => fetchData(false)}>Fetch Data With Error</button>
        <input
          placeholder="Set timeout value"
          value={timeoutValue}
          onChange={(e) => setTimeoutValue(e.target.value)}
        />
        {loading ? (
          <div>Fetching data...</div>
        ) : error ? (
          <div>An error occurred!</div>
        ) : albums.length > 0 ? (
          <Table albums={albums} />
        ) : (
          "Data has not been fetched."
        )}
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/table");
  const data = await res.json();
  return { props: { data } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 100px;
`;
