	/*
	header: {
		 'Authorization': 'Token '+token,
	}*/
import React ,{useState} from 'react';
import { useHistory } from "react-router-dom";
import {
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonContent,
	IonButton
} from '@ionic/react';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const LoginPage = () => {
	const history = useHistory();
	const [usernameError,setUsernameError]=useState('');
	const [passwordError,setPasswordError]=useState('');
	const [isError,setIsError]=useState(true);
	const [loginMessage,setLoginMessage]=useState("");

	async function Login(event) {
		event.preventDefault();
		if (isError==false)
		{		
				var formdata = new FormData(event.target);
				var requestOptions = {
				  mode:'cors',
				  method: 'POST',
				  body: formdata,
				  redirect: 'follow'
				};
				const response=await fetch("http://lokidev.herokuapp.com/login/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
				if (response.status=="200")
				{
					console.log("Login success. ",response);
					await Storage.set({
					   key: 'token',
					   value: response.data.token
					 });

					var reqOp = {
						mode:'cors',
						method: 'POST',
						redirect: 'follow',
						headers: {
					  			'Authorization':'Token '+response.data.token
					  		},
						};
					const username_response=await fetch("http://lokidev.herokuapp.com/whoami/", reqOp).then( username_response => username_response.json().then(xdy => ({status:username_response.status,data:xdy})));
						console.log("Got username from server ",username_response);

					await Storage.set({
						key: 'username',
						value: username_response.data.name
					 });
					console.log("Username and token stored. Going to MainPage")
					history.push("/main");
				}
				else
				{
					console.log("error at login. ",response);
					setLoginMessage(response);
				}
		}
		else
		{
			console.log("User clicked Login without resolving validation errors");
		}
	}
	async function username_check(username_to_test) {
		if (/^[a-z0-9]{5,15}$/.test(username_to_test))
		{
			setIsError(false);
					setUsernameError("👍");
		}
		else
		{
			setUsernameError("Username should be between 5-15 characters.Only numbers(0-9) and small letters (a-z)");
			setIsError(true);
		}
	}
	async function password_check(password) {
		if (password.length>=8 && password.length<=12)
		{
			setPasswordError("👍")
			setIsError(false);
		}
		else if(password.length<8)
		{
			setPasswordError(" Password should be at least 8 characters")
			setIsError(true);
		}
		else if(password.length>12)
		{
			setPasswordError("Password should be not more than 12 characters ")
			setIsError(true);
		}
	}

	return(
		<>
		<b>Login</b>
			<form onSubmit={(event) => {Login(event);}}>
						<input required name="username" type="text" onChange={(e) => username_check(e.target.value)}/>
					<p style={{fontSize:15,color:"red"}}>{usernameError}</p>
						<input required name="password" type="password" onChange={(e) => password_check(e.target.value)}/>
					<p style={{fontSize:15,color:"red"}}>{passwordError}</p>
				<button class="myButton" type="submit">Login!</button>
			</form>
			<p style={{fontSize:20}}>{loginMessage}</p>
		</>
		);
};
export default LoginPage;
