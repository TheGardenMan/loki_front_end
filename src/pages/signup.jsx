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

const SignupPage = () => {
	const history = useHistory();
	const [usernameError,setUsernameError]=useState('');
	const [passwordError,setPasswordError]=useState('');
	const [isError,setIsError]=useState(true);
	const [signupMessage,setSignupMessage]=useState("");

	async function signup(event) {
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
				//DND: Do not change the "then"s here.It waits until the req is resloved and returns the data instead of returning a Promise.
				// ToDo:"then" is not needed while using await inside an sync.See  this:https://stackoverflow.com/a/64421533/14475872
				const response=await fetch("http://lokidev.herokuapp.com/signup/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
			// { status: 201, data: {token: "d5ba4b00d29f3d9b1261b5e1934061b1861e5df4" ,username: "jagav"}} } or {status:400,data:{username:['This field must be unique']}}
			// DND "== to ===" do not do that
				if (response.status=="201")
				{
					console.log("Account created. ",response);
					await Storage.set({
					   key: 'token',
					   value: response.data.token
					 });
					await Storage.set({
					   key: 'username',
					   value: response.data.username
					 });
					console.log("Username and token stored. Going to MainPage")
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
			console.log("User clicked signup without resolving validation errors");
		}
	}
	async function username_check(username_to_test) {
		if (/^[a-z0-9]{5,15}$/.test(username_to_test))
		{
			setUsernameError("Checking availablity");
			// Bomb:true to false
			setIsError(false);

			var requestOptions = {
			  mode:'cors',
			  method: 'POST',
			  redirect: 'follow',
			  headers: {
				  'Content-Type': 'application/json'
				},
			  body:JSON.stringify({username:username_to_test})
			};
			const response=await fetch("http://lokidev.herokuapp.com/username_check/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
			console.log(response);
			if (response.status=="200")
			{
				console.log("XX");
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
		<b>Signup</b>
			<form onSubmit={(event) => {signup(event);}}>
						<input required name="username" type="text" onChange={(e) => username_check(e.target.value)}/>
					<p style={{fontSize:15,color:"red"}}>{usernameError}</p>
						<input required name="password" type="password" onChange={(e) => password_check(e.target.value)}/>
					<p style={{fontSize:15,color:"red"}}>{passwordError}</p>
				<button class="myButton" type="submit">Signup!</button>
			</form>
			<p style={{fontSize:20}}>{signupMessage}</p>
		</>
		);
};
export default SignupPage;
