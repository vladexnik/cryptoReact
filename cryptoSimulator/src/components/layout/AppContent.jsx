import {Layout, Typography} from "antd";
import CryptoContext from "../../context/cryptoContext";
import { useContext } from "react";
import Graphic from "./Graphic";
import AssetsTable from "./AssetsTable";


const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '',
    backgroundColor: '#001529',
    padding: '1rem'
};

export default function AppContent(){

    const {assets, dollarScore, crypto}=useContext(CryptoContext);
    
    return(
        <Layout.Content style={contentStyle}>
            <Typography.Title 
                level={3} 
                style={{textAlign: 'left', color:'#fff'}}
            >
            Dollar Score: {dollarScore.toLocaleString('us')} $
            <br/>
            Portfolio : {assets?.map(asset=>{
                const coin=crypto.find((c)=> c.id===asset.id);
                return asset.amount*coin.price
            })
            .reduce((acc, v)=> (acc+=v) ,0).toLocaleString('us') } $
            <br/>
            Total Profit : {assets?.map(asset=>{
                const coin=crypto.find((c)=> c.id===asset.id);
                return asset.amount * coin.price - asset.amount * asset.price
            })
            .reduce((acc, v)=> (acc+=v) ,0).toLocaleString('us')} $
            <br/>


            </Typography.Title>
            <Graphic/>
            <AssetsTable/>
        </Layout.Content>
    )
}