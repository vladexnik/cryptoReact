// import { DatePicker, message } from 'antd';
import React, { useState } from 'react';

import { CryptoContextProvider } from './context/cryptoContext';
import AppLayout from './components/layout/AppLayout';

const App = () => {

  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
  );
};

export default App;