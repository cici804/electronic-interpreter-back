// 入口文件
import React from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>

);

// 以前 react18换成了上面这样的
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

