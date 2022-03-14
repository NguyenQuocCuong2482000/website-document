import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'

import Header from './components/Header'
import Todos from './components/Todos'
import React, { Fragment } from 'react';

function App() {
  return (    //cho Router vào trong AuthContextProvide và PostContextProvider giúp nó nhận dược dữ liệu từ chúng
	  <AuthContextProvider>
		  <PostContextProvider>
			  
			  <Router> 
			<Switch>
			<Route exact path='/' component={Landing} />
			<Route
				exact
				path='/login'
				render={props => <Auth {...props} authRoute='login' />}
			/>
			<Route
				exact
				path='/register'
				render={props => <Auth {...props} authRoute='register' />}
			/>
			<ProtectedRoute exact path='/dashboard' component={Dashboard} />
			<ProtectedRoute exact path='/about' component={About} />
			<ProtectedRoute exact path='/about1' component={About} />
			
			</Switch>
  		</Router>

			<Fragment /*Fragment chức năng giống div */>   
					<Header/>
					<Todos />
			</Fragment>
			
		  </PostContextProvider>
		  
	  </AuthContextProvider>
  ) 
}






export default App;
