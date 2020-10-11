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
	const [uname,setUname]=useState("");
	let ttoken='';
	const bogusFunctionForAsyncOperations = async () => 
	{	let temp;
		let key='username';
		temp=await SecureStoragePlugin.get({ key })
		  .then(value => {
		  	 console.log(value," Got username from storage  at MainPage");
		    return value;
		  })
		  .catch(error => {
		    console.log('Item with specified key does not exist.');
		    return ( "Error at MainPage .The key is "+key);
		  });
		  setUsername(temp.value);
		  key='token';
		  temp=await SecureStoragePlugin.get({ key })
		  .then(value => {
		  	 console.log(value," got token at MainPage");
		    return value;
		  })
		  .catch(error => {
		    console.log('Item with specified key does not exist.');
		    return ( "Error at MainPage .The key is "+key);
		  });
		  setToken(temp.value);
		  ttoken=temp.value;// for using in header
	}

	const getU = async () =>{
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: new Headers({
		    'Authorization': 'Token '+ttoken ,
		    "Content-Type": "application/json"
		  }),
		};
		const status=await fetch("http://127.0.0.1:8000/whoami/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
		console.log(status," data");
		setUname("Username fetched from server is => "+status.data.name+ "!");
	}
	bogusFunctionForAsyncOperations();

	return (
		<>
			<p>Hello {username}! </p>
			{uname || 'Get username,id from from server'}
			<IonButton onClick={() => getU()}>uname</IonButton>
		</>
		);
	};
export default MainPage;