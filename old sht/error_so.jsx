import React ,{useState} from 'react';
import {
	IonApp, 
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton
} from '@ionic/react';
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins;


const MainPage=  () => {
	const [username,setUsername]=useState("h");
	const [token,setToken]=useState("blah");
	let token='';
	const bogusFunctionForAsyncOperations = async () => 
	{	console.log("Hello world");
		let temp;
		let key='username';
		temp=await SecureStoragePlugin.get({ key })
		  .then(value => {
		  	 console.log(value.value," Got username from storage  at MainPage");
		    return value;
		  })
		  .catch(error => {
		    console.log('Item with specified key does not exist.');
		    return ( "Error at MainPage .The key is "+key);
		  });
		  setUsername(temp.value);
		  token=temp.value;// for using in header
	}
	bogusFunctionForAsyncOperations();
	return (
		<>
			<p>Hello {username}! </p>
		</>
		);
	};
export default MainPage;