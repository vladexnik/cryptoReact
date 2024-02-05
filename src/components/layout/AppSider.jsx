import {Layout, Card, Statistic, List, Typography} from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


const siderStyle = {
    padding: '1rem',
    // textAlign: 'center',
    // lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#1677ff',
  };

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  
export default function AppSider(){

    return(
        <Layout.Sider width="25%" style={siderStyle}>
            <Card style={{marginBottom: '1rem' }}
            >
                <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                    color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    size="small"
                    renderItem={(item) => (
                        <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
          </Card>
          <Card bordered={false}>
            <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
                color: '#cf1322',
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
            />
          </Card>

      </Layout.Sider>
    )
}