import React, { useState, useContext } from 'react';
import { DataContext } from '../caminho/para/DataProvider';

const NumericFilter = () => {
  const { filterByNumericValues, setFilterByNumericValues } = useContext(DataContext);

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

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...filterByNumericValues];
    updatedFilters.splice(index, 1);
    setFilterByNumericValues(updatedFilters);
  };

  return (
    <div>
      {filterByNumericValues.map((filter, index) => (
        <div key={index}>
          {`Filtro ${index + 1}: ${filter.column} ${filter.comparison} ${filter.value}`}
          <button onClick={() => handleRemoveFilter(index)}>Remover</button>
        </div>
      ))}

      <select value={currentFilter.column} onChange={handleColumnChange} data-testid="column-filter">
        <option value="">Selecione a Coluna</option>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
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