'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { BACKEND_URL } from '../../constant';

const SpeedTestChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isBarChart, setIsBarChart] = useState(false);


  const fetchData = async (filter: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/speedtest?filter=${filter}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };
  const buttonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

  return (
    <div>
      <div className='flex gap-4 justify-center py-4'>
        <button className={buttonClass} onClick={() => setFilter('daily')}>Day</button>
        <button className={buttonClass} onClick={() => setFilter('weekly')}>Weekly</button>
        <button className={buttonClass} onClick={() => setFilter('monthly')}>Monthly</button>
        <button className={buttonClass}
          onClick={() => setFilter('all')}>All</button>
      </div>
      <button className='pl-8 pb-4'onClick={toggleChartType}>
        {isBarChart ? 'Switch to Line Chart' : 'Switch to Bar Chart'}
      </button>

      <ResponsiveContainer width="100%" height={400}>
        {isBarChart ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="download_speed" fill="#8884d8" />
            <Bar dataKey="upload_speed" fill="#82ca9d" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis
              domain={[1, 1000]}
              ticks={[1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
              label={{ value: 'Speed (Mbps)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="download_speed" stroke="#8884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="upload_speed" stroke="#82ca9d" />
          </LineChart>
        )
        }
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedTestChart;