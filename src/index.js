import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));

export const server = "https://project-mern-shopnow-backend.onrender.com";
// export const server = "http://localhost:5000";


root.render(
   <Provider store = {store}> 
   <App />
   </Provider>

);

