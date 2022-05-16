import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import HomePage from './HomePage.jsx'
import Signs from './Signs.jsx'

const Routes = () => (
   <Router>
      <Scene key = "root" hideNavBar wrap={false}>

         <Scene key = "home" component = {HomePage} initial />
         <Scene key = "signs" component = {Signs} />

      </Scene>
   </Router>
)
export default Routes