import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataProvider';

const Table = () => {
  const { data, order, setOrder } = useContext(DataContext);

  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedSort, setSelectedSort] = useState('ASC');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleSortSubmit = () => {
    if (selectedColumn) {
      setOrder({ column: selectedColumn, sort: selectedSort });
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const columnA = a[order.column];
    const columnB = b[order.column];

    // Handle 'unknown' values by sorting them to the bottom
    if (columnA === 'unknown' && columnB !== 'unknown') return 1;
    if (columnB === 'unknown' && columnA !== 'unknown') return -1;

    // Perform numeric or string comparison based on the column type
    return columnA - columnB;
  });

  // Renderizar a tabela
  return (
    <div>
      <div>
        <select value={selectedColumn} onChange={handleColumnChange} data-testid="column-sort">
          <option value="">Selecione a Coluna</option>
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>

        <label>
          <input
            type="radio"
            value="ASC"
            checked={selectedSort === 'ASC'}
            onChange={handleSortChange}
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>

        <label>
          <input
            type="radio"
            value="DESC"
            checked={selectedSort === 'DESC'}
            onChange={handleSortChange}
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>

        <button onClick={handleSortSubmit} data-testid="column-sort-button">
          Ordenar
        </button>
      </div>

      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).filter((key) => key !== 'residents').map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((planet) => (
            <tr key={planet.name} data-testid="planet-name">
              {Object.keys(planet).filter((key) => key !== 'residents').map((header) => (
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
