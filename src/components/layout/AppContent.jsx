import Layout from "antd/es/layout/layout";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
  };

export default function AppContent(){

    return(
        <Layout.Content style={contentStyle}>Content</Layout.Content>
    )
}