import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import './index.css';
import './styles/images/thumbnail.png'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'; 
import { Provider } from 'react-redux'; 
import auth from './reducers'; 

const store = createStore(auth);



ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> ,
     document.getElementById('root'));
registerServiceWorker();


if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(<
            NextApp />,
            document.getElementById('root')
        )
    })
}