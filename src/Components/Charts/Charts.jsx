import React,{useState, useEffect} from 'react';
import {fetchdailydata} from '../../Api'
import {Line, Bar} from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({data:{confirmed, recovered, deaths, lastUpdate },country}) => {
    const [dailyData, setDailyData] = useState({});
useEffect(() => {
const fetchApi = async () =>{
    setDailyData(await fetchdailydata());
}
fetchApi();
},[]);
const LineChart = (
    dailyData.length ? (<Line 
    data ={{
        labels:dailyData.map(({date})=>date),
        datasets:[
            {
                data: dailyData.map(({confirmed})=>confirmed),   
                label: "Infected",
                borderColor:'#333fff',
                fill:true,
            },{
                data: dailyData.map(({deaths})=>deaths),   
                label: "Deaths",
                borderColor:'red',
                fill:true,
            }]
    }}
    />) : null
)
console.log(confirmed,recovered,deaths);
const barChart = (
confirmed?<Bar 
    data={{
        labels:['Infected','Recovered','Deaths'],
        datasets:[{
            label : 'people',
            backgroundColor:[
                    'rgba(0,0,255,0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(251, 0, 0, 0.5)',
            ], 
        data:[confirmed.value,recovered.value,deaths.value]
        }]
    }}
    datasets={{
        legend:{display:false},
        title:{display: true,text:`Current State in ${country}`},
    }}
/>:null
)

return (
   <div className ={styles.container}>
   {country ? barChart :LineChart}
   </div>
);
}

export default Charts;