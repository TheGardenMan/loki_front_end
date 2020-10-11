import React, { useState } from 'react';
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

const LoginPage = () => {
	const [loginStatus,setLoginStatus]=useState("Not logged in");
	const login = async (event) => {
			event.preventDefault();
			var formdata = new FormData(event.target);
			var requestOptions = {
			  mode:'cors',
			  method: 'POST',
			  body: formdata,
			  redirect: 'follow'
			};
			let token;
			try{
				// ToDo:Do this like the one on signup page.No "if" only "then".
					const response=await fetch("http://127.0.0.1:8000/login/", requestOptions);
					if (response.status=="400")
					{
						console.log("Nope ",response.status);
					}
					else
					{
						console.log(response.json());
					}
				}
			catch(e)
			{
				console.log("Error at login func ",e);
			}
	}
	return (
			<>
			<IonHeader>
				<IonToolbar>	<IonTitle>Jaga</IonTitle>	</IonToolbar>
			</IonHeader>
			<IonContent>
			<b>{loginStatus}</b>
			<form onSubmit={(event) =>{login(event);}}>
				<IonList>
					<IonItem>
						<IonLabel>Username</IonLabel>
						<IonInput required name="username" type="text"/>
					</IonItem>
					<IonItem>
						<IonLabel>Password</IonLabel>
						<IonInput required name="password" type="password"/>
					</IonItem>
				</IonList>
				<IonButton align type="submit">Login</IonButton>
			</form>
			</IonContent>
			</>
	);
};
export default LoginPage;
