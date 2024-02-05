import {Layout, Card, Statistic, List, Typography,Spin, Tag} from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize} from '../../../src/utils'
import { useContext } from "react";
import  CryptoContext  from "../../context/cryptoContext";

const siderStyle = {
    padding: '1rem',
  };

export default function AppSider(){

    const {assets, loading}=useContext(CryptoContext);
    if(loading){
        return <Spin fullscreen />
    }

    return(
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset)=>(
                <Card key={asset.id} style={{marginBottom: '1rem' }}
                >
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                        }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        bordered
                        dataSource={[
                            {title: 'Total profit', value: asset.totalProfit, percentTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true },
                            // {title: 'Difference', value: asset.growPercent}
                        ]}
                        size="small"
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.percentTag && 
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                        {asset.growPercent}%
                                        </Tag>
                                    }
                                    {item.isPlain && <span>{item.value.toFixed(2)}</span>}
                                    {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            )
            )}
          

      </Layout.Sider>
    )
}