import React, { useEffect, useState } from 'react';
import TransformerTable from './components/TransformerTable';
import TransformerChart from './components/TransformerChart';
import transformersData from './data/transformersData.json';

// Define types for transformer data
interface VoltageReading {
  timestamp: string;
  voltage: number;
}

interface Transformer {
  assetId: string;
  name: string;
  region: string;
  health: string;
  lastTenVoltageReadings: VoltageReading[];
}

const App: React.FC = () => {
  const [transformers, setTransformers] = useState<Transformer[]>(transformersData);
  const [showTable, setShowTable] = useState<boolean>(true); // State to toggle between table and chart

  useEffect(() => {
    const savedState = localStorage.getItem('transformerAppState');
    if (savedState) {
      setTransformers(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transformerAppState', JSON.stringify(transformers));
  }, [transformers]);

  const toggleView = () => {
    setShowTable(!showTable); // Toggle the view state
  };

  return (
    <div className='p-4'>
      <h1 className="text-2xl font-bold">Transformer Asset Visualization</h1>
      {showTable ? (
        <TransformerTable transformers={transformers} onToggle={toggleView} />
      ) : (
        <TransformerChart transformers={transformers} onToggle={toggleView} />
      )}
    </div>
  );
};

export default App;