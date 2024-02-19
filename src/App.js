import React from 'react';
import './App.css';
import Table from './Components/Table';
import { DataProvider } from './Context/DataProvider';
 
function App() { 
  return (
    <DataProvider> 
      <Table />
    </DataProvider>
  );
}

export default App;
