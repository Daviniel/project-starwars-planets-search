import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataProvider';

const NumericFilter = () => {
  const { data, setFilterByNumericValues } = useContext(DataContext);

  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedComparison, setSelectedComparison] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleComparisonChange = (event) => {
    setSelectedComparison(event.target.value);
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFilter = () => {
    if (selectedColumn && selectedComparison && selectedValue) {
      setFilterByNumericValues([
        ...data.filterByNumericValues,
        {
          column: selectedColumn,
          comparison: selectedComparison,
          value: selectedValue,
        },
      ]);
    }
  };

  return (
    <div>
      <select value={selectedColumn} onChange={handleColumnChange} data-testid="column-filter">
        <option value="">Selecione a Coluna</option>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
      </select>

      <select value={selectedComparison} onChange={handleComparisonChange} data-testid="comparison-filter">
        <option value="">Selecione a Comparação</option>
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
      </select>

      <input
        type="number"
        value={selectedValue}
        onChange={handleValueChange}
        placeholder="Digite um valor"
        data-testid="value-filter"
      />

      <button onClick={handleFilter} data-testid="button-filter">
        Filtrar
      </button>
    </div>
  );
};

export default NumericFilter;