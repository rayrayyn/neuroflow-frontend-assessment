import React, { useState } from "react";

export const Table = ({ albums }) => {
  const [search, setSearch] = useState("");

  /**
   * Returns a date formatted as "MM/DD/YYYY" or "MM/DD/YYYY HH:MM am"
   * @param {Date} date - A date in any format
   * @param {boolean} [includeTime] - Boolean to include HH:MM am/pm
   * @return {Date} - A date in the specificed format
   */
  const formatDate = (date, includeTime) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      ...(includeTime && { hour: "numeric", minute: "numeric" }),
    };

    return new Date(date)
      .toLocaleString("en-US", options)
      .replace(",", "")
      .toLowerCase();
  };

  /**
   * Sorts the albums in descending order, formats the dates, and filters the albums based on what was inputted in the search bar.
   * First, the array is sorted because the last listened dates are initially in milliseconds, making it easier to compare.
   * Then, it is mapped to format the dates (The conditional is there so if it is null, it appears as "- -")
   * Lastly, the filter is applied so you are able to search what you see on the table.
   */
  const filteredAlbums = albums
    .sort((x, y) => y.last_listened - x.last_listened)
    .map((album) => {
      return {
        ...album,
        last_listened:
          album.last_listened && formatDate(album.last_listened, true),
        release_date: album.release_date && formatDate(album.release_date),
      };
    })
    .filter((album) =>
      Object.values(album).join("").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <input
        placeholder="Filter Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Band</th>
            <th>Album</th>
            <th>Genres</th>
            <th>Last Played</th>
            <th>Date Released</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlbums.map((album, index) => (
            <tr key={index}>
              <td>{album.band_name || "- -"}</td>
              <td>{album.album_title || "- -"}</td>
              <td>{album.genres.join(", ") || "- -"}</td>
              <td>{album.last_listened || "- -"}</td>
              <td>{album.release_date || "- -"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
