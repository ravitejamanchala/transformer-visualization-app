import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { AutoGraph, TableRows } from '@mui/icons-material';

interface VoltageReading {
    timestamp: string;
    voltage: number;
}

interface Transformer {
    assetId: string;
    name: string;
    lastTenVoltageReadings: VoltageReading[];
}

interface TransformerChartProps {
    transformers: Transformer[];
    onToggle: () => void; 
}

const TransformerChart: React.FC<TransformerChartProps> = ({ transformers, onToggle }) => {

    const [selectedIDs, setSelectedIDs] = useState<string[]>(transformers.map(t => t.assetId));


    const handleCheckboxChange = (id: string) => {
        setSelectedIDs(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

  
    const filteredTransformers = transformers.filter(t => selectedIDs.includes(t.assetId));

    // Prepare data for Nivo
    
    const data = filteredTransformers.map(transformer => ({
        id: transformer.name,
        data: transformer.lastTenVoltgageReadings.map(reading => ({
            x: new Date(reading.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            y: reading.voltage,
        })),
    }));

    return (
        <div className="overflow-x-auto mt-6 min-w-full bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between w-full">
                <div className="mb-4 flex">
                    {transformers.map((t) => (
                        <div key={t.assetId} className="flex items-center mb-2 mr-6 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedIDs.includes(t.assetId)} // Check if ID exists in selectedIDs
                                onChange={() => handleCheckboxChange(t.assetId)}
                                className="mr-1"
                                id={t.assetId}
                            />
                            <label htmlFor={t.assetId} className="text-gray-700 cursor-pointer">{t.name}</label>
                        </div>
                    ))}
                </div>
          <div className="flex border-2 border-blue-500">
            <button
              onClick={onToggle}
              
              className="px-4 py-2 text-blue-500 "
            >
              <TableRows className='mr-1' />
            </button>
            <button
              onClick={onToggle}
              disabled={true}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
            >
              <AutoGraph />
            </button>
          </div>
            </div>
            <div style={{ height: '400px' }} className='p-4'>
                <ResponsiveLine
                    data={data}
                    curve='catmullRom'
                    margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false,
                    }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendOffset: 50,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: 'Voltage',
                        legendOffset: -50,
                        legendPosition: 'middle',
                    }}
                    enablePoints={true}
                    pointSize={8}
                    enableGridX={true}
                    enableGridY={true}
                    colors={{ scheme: 'nivo' }}
                    lineWidth={3}
                    useMesh={true}
                    tooltip={({ point }) => (
                        <div style={{ padding: '10px', background: 'white', border: '1px solid #ccc' }}>
                            <strong>{point.serieId}</strong>
                            <br />
                            Voltage: {point.data.y}
                            <br />
                            Date: {point.data.x}
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default TransformerChart;