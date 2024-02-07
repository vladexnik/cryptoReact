import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import  CryptoContext from '../../context/cryptoContext';
import { useContext } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Graphic(){

    const {assets}=useContext(CryptoContext);
    const data = {
    labels: assets.map((a)=> a.name),
    datasets: [
        {
        label: '$',
        data: assets.map((a)=> a.totalAmount),
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(125, 159, 64, 1)',
            'rgba(32, 206, 86, 1)',
        ],

        },
    ],
    };

    return(
        <div style={{ 
            display: 'flex', 
            marginBottom: '1rem',
            justifyContent: 'center',
            height:'400px',
            color: 'white'
        }}>
            <Pie data={data}/>
        </div>
        
    )
}