import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

import Navbar from './components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/common.css'

const App = () => (
  <Router>
      <div>
          <Navbar/>
          <div className="content">
              <Routes />
          </div>
      </div>
  </Router>
)

export default hot(module)(App)
