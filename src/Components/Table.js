import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataProvider';

const Table = () => {
  const { data } = useContext(DataContext);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = data.filter((planet) =>
    planet.name.toLowerCase().includes(filter.toLowerCase())
  );

  const headers = Object.keys(filteredData[0] || {}).filter((key) => key !== 'residents');

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filter}
        onChange={handleFilterChange}
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((planet) => (
            <tr key={planet.name}>
              {headers.map((header) => (
                <td key={header}>{planet[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;