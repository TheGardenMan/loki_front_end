	/*
	LW : Signup page with username validation (min length - 5) ,avail,pwd length (8) and hello {username} after that.
	header: {
		 'Authorization': 'Token '+token,
	}*/
import React ,{useState} from 'react';
import { useHistory } from "react-router-dom";
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

const SignupPage=() => {
	const history = useHistory();
	const [usernameError,setUsernameError]=useState('');
	const [passwordError,setPasswordError]=useState('');
	const [isError,setIsError]=useState(true);
	const [signupMessage,setSignupMessage]=useState("");
	const [messageColor,setMessageColor]=useState("red");
	const signup = async (event) => {
		event.preventDefault();
		let token;
		if (isError===false)
		{		
				var formdata = new FormData(event.target);
				var requestOptions = {
				  mode:'cors',
				  method: 'POST',
				  body: formdata,
				  redirect: 'follow'
				};
				//DND: Do not change the "then"s here.It waits until the req is resloved and returns the data instead of returning a Promise.
				const response=await fetch("http://127.0.0.1:8000/signup/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
			// { status: 201, data: {token: "d5ba4b00d29f3d9b1261b5e1934061b1861e5df4" ,username: "jagav"}} } or {status:400,data:{username:['This field must be unique']}}
				if (response.status=="201")
				{
					console.log("signup success ",response);
					setSignupMessage("Account created successfully!");
					// Do not use anything other than "key,value" for variable names in secure storage.It will not work.It will be stored as undefined.Dont use const if you wanna change later.Here let is used since I have to reuse it later.
					let key = 'username';
					let value = response.data.username;
					await SecureStoragePlugin.set({ key, value })
					  .then(success => console.log(success))
					await SecureStoragePlugin.get({ key })
					  .then(value => {
						console.log(value);
					  })
					  .catch(error => {
						console.log('Item with specified key does not exist.');
					  });
					  // It should always be key and value.Always.
					key='token';
					value=response.data.token;
					await SecureStoragePlugin.set({ key, value }).then(success => console.log(success));
					await SecureStoragePlugin.get({ key })
					  .then(value => {
						console.log(value);
					  })
					  .catch(error => {
						console.log('Error at SignupPage.Item with specified key does not exist.');
					  });
					history.push("/main");
				}
				else
				{
					console.log("error at creating user. ",response,response.data.username[0]);
					if (response.data.username)
					{
						setSignupMessage(response.data.username[0]+" Username is not unique.check_username fked up or signup fked up");
					}
					else
					{
						setSignupMessage(response.data.password[0]+" Password is too short or too big.check_password or signup fked up");	
					}
				}
		}
		else
		{
			console.log("Errors in data");
		}
	}
	const username_check = async (username_to_test) => {
		if (/^[a-z0-9]{5,15}$/.test(username_to_test))
		{
			setUsernameError("Checking availablity");
			setIsError(true);

			var requestOptions = {
			  mode:'cors',
			  method: 'POST',
			  redirect: 'follow',
			  headers: {
				  'Content-Type': 'application/json'
				},
			  body:JSON.stringify({username:username_to_test})
			};
			const response=await fetch("http://127.0.0.1:8000/username_check/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
			if (response.status=="200")
			{
				if (response.data=="0")
				{
					setUsernameError("Username not available");
				}
				else if(response.data=="1")
				{
					setUsernameError("👍");
				}
			}
		}
		else
		{
			setUsernameError("Username should be between 5-15 characters.Only numbers(0-9) and small letters (a-z)");
			setIsError(true);
		}
	}
	const password_check = async (password) => {
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
		<b>Signup</b>
			<form onSubmit={(event) => {signup(event);}}>
				<IonList>
					<IonItem>
						<IonLabel>Username</IonLabel>
						<IonInput required name="username" type="text" onIonChange={(e) => username_check(e.target.value)}/>
					</IonItem>
					<p style={{fontSize:15,color:"red"}}>{usernameError}</p>
					<IonItem>
						<IonLabel>Password</IonLabel>
						<IonInput required name="password" type="password" onIonChange={(e) => password_check(e.target.value)}/>
					</IonItem>
					<p style={{fontSize:15,color:"red"}}>{passwordError}</p>
				</IonList>
				<IonButton type="submit">Signuzpp</IonButton>
			</form>
			<p style={{fontSize:20}}>{signupMessage}</p>
		</>
		);
};
export default SignupPage;
