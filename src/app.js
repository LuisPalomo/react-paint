import React from 'react';
import ReactDOM from 'react-dom';

import PaintApp from './components/PaintApp';

import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'react-rangeslider/lib/index.css';
import './styles/styles.scss';

ReactDOM.render(<PaintApp />, document.getElementById('app'));
