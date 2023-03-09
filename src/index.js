import React from 'react'
import {createRoot} from 'react-dom/client';
import App from './App.jsx'

const container =  document.getElementById('root');
const root = createRoot(container);
//this is where everything within App renders from
root.render(<App/>);