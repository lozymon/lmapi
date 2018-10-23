
require('./config');

import {server} from '../src/lmApi';
import apiList from './api';

server(apiList);