import { Table } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../../context/cryptoContext';

export default function AssetsTable(){

const {assets}=useContext(CryptoContext);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Total Amount, $',
    dataIndex: 'totalAmount',
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: 'Profit, $',
    dataIndex: 'totalProfit',
    sorter: (a, b) => a.totalProfit - b.totalProfit,
  },
];

    const data2=assets.map((a)=>({
        key:a.key,
        name:a.name,
        price: a.price,
        amount:a.amount,
        totalAmount: a.totalAmount.toFixed(2),
        totalProfit: a.totalProfit.toFixed(2)
    }))
   
    return(
        <div>
            <Table
                style={{ margin:'1rem'}} 
                pagination={false}
                columns={columns} 
                dataSource={data2} 
            />
        </div>
        
    )
}