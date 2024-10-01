import React, { useState } from 'react';
import { AutoGraph,  TableRows } from '@mui/icons-material';
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

interface TransformerTableProps {
  transformers: Transformer[];
  onToggle: () => void; 
  showChart: boolean; 
}

const TransformerTable: React.FC<TransformerTableProps> = ({ transformers, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransformers = transformers.filter(transformer =>
    transformer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transformer.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transformer.health.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto mt-6 min-w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, region, or health..."
          className="p-2 border border-gray-500 rounded-md min-w-[300px] h-[50px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex border-2 border-blue-500">
          <button
            onClick={onToggle}
            disabled={true}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            <TableRows className='mr-1' />
          </button>
          <button
            onClick={onToggle}
            className="px-4 py-2 text-blue-500"
          >
            <AutoGraph />
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg table-auto">
        <thead>
          <tr className="bg-blue-500 text-gray-100 py-5">
            <th className="py-2 px-4 border-b">Asset ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Region</th>
            <th className="py-2 px-4 border-b">Health</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransformers.length > 0 ? (
            filteredTransformers.map(transformer => (
              <tr key={transformer.assetId} className="hover:bg-gray-100 text-center py-5">
                <td className="py-2 px-4 border-b">{transformer.assetId}</td>
                <td className="py-2 px-4 border-b">{transformer.name}</td>
                <td className="py-2 px-4 border-b">{transformer.region}</td>
                <td className="py-2 px-4 border-b">{transformer.health}</td>
                
              </tr>
              
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2 px-4 border-b text-center">
                No transformers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransformerTable;