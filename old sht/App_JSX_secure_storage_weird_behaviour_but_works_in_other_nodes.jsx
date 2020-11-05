import React ,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, triangle} from 'ionicons/icons';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import MainPage from './pages/main';
import Tab2 from './pages/Tab2';

import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins;

// Dont make App async

const App =  () => {
	let key = 'username';
	let nextPageURL="/signup";
	async function p(){
				SecureStoragePlugin.get({ key })
					.then(obj => {
					console.log("Username jk from local storage:",obj.value);
					nextPageURL="/main";
					})
					.catch(error => {
					console.log('Item with specified key does not exist.');
					});
	}
	useEffect(() => {
		p();
		console.log(nextPageURL);

	},[]);	
	return(
	<IonApp>
		<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/login" component={LoginPage} exact={true} />
					<Route path="/signup" component={SignupPage} exact={true} />
					<Route path="/main" component={MainPage} exact={true} />
					<Route path="/camera" component={Tab2} exact={true} />
					<Route path="/" render={() => <Redirect to={nextPageURL} />} exact={true} />
				</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
	);
};
export default App;

