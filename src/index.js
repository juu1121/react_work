import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; //App.js를 import해서 App 라는 이름으로 사용하기
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom'; 
//폴더명까지만 import하면 default로 index.jsx가 import된다.
import router from './router';

// id가 root인 div안에 App.js에서 리턴해준 component로 채우기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
