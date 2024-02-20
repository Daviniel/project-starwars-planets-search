import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../caminho/para/DataProvider';

const NumericFilter = () => {
  const { filterByNumericValues, setFilterByNumericValues } = useContext(DataContext);
  const [availableColumns, setAvailableColumns] = useState([]);

  useEffect(() => {
    const usedColumns = filterByNumericValues.map((filter) => filter.column);
    const newAvailableColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'].filter(
      (column) => !usedColumns.includes(column)
    );

    setAvailableColumns(newAvailableColumns);
  }, [filterByNumericValues]);

  const initialFilter = {
    column: '',
    comparison: '',
    value: '',
  };

  const [currentFilter, setCurrentFilter] = useState({ ...initialFilter });

  const handleColumnChange = (event) => {
    setCurrentFilter({ ...currentFilter, column: event.target.value });
  };

  const handleComparisonChange = (event) => {
    setCurrentFilter({ ...currentFilter, comparison: event.target.value });
  };

  const handleValueChange = (event) => {
    setCurrentFilter({ ...currentFilter, value: event.target.value });
  };

  const handleAddFilter = () => {
    if (currentFilter.column && currentFilter.comparison && currentFilter.value !== '') {
      setFilterByNumericValues([...filterByNumericValues, { ...currentFilter }]);
      setCurrentFilter({ ...initialFilter });
    }
  };

  return (
    <div>
      {filterByNumericValues.map((filter, index) => (
        <div key={index}>
          {`Filtro ${index + 1}: ${filter.column} ${filter.comparison} ${filter.value}`}
        </div>
      ))}

      <select value={currentFilter.column} onChange={handleColumnChange} data-testid="column-filter">
        <option value="">Selecione a Coluna</option>
        {availableColumns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      <select value={currentFilter.comparison} onChange={handleComparisonChange} data-testid="comparison-filter">
        <option value="">Selecione a Comparação</option>
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
      </select>

      <input
        type="number"
        value={currentFilter.value}
        onChange={handleValueChange}
        placeholder="Digite um valor"
        data-testid="value-filter"
      />

      <button onClick={handleAddFilter} data-testid="button-filter">
        Adicionar Filtro
      </button>
    </div>
  );
};

export default NumericFilter;