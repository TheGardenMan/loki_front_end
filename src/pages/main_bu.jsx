import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {
	IonButton,IonContent
} from '@ionic/react';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;
const MainPage=  () => {
	const [username,setUsername]=useState("");
	const [token,setToken]=useState("token is not loaded yet");
	const history = useHistory();
	async function fetchUsernameFromLocalStorage ()	{
		let temp = await Storage.get({ key: 'username' });
		setUsername(temp.value);
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
		// printing username here doesn't work
		console.log("MainPage: username gotten from storage",temp.value);
		}

	async function logout() {
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
		};
		// Do not JSON here.It's already JSON
		const response=await fetch("http://192.168.225.56:8000/logout/", requestOptions);
		console.log(response);
		if (response.status===200)
		{
			console.log("logout success");
			await Storage.remove({key:'token'});
			console.log("Token deleted ");
			history.push("/signup");
		}
		else
		{
			console.log("cant logout");
		}


	}

	useEffect(() => {
			fetchUsernameFromLocalStorage();

		},[]);

	return (
		<div class="page">
			<p>Hello {username}! </p>
			<Link to="/feed">
			<button class="myButton" routerLink="/feed" routerDirection="forward" onClick> Feed </button>
			</Link>
			<br></br>
			<br></br>
			<button class="myButton" routerLink="/makepublicpost" routerDirection="forward"> Make PublicPost</button>
			<br></br>
			<button class="myButton" routerLink="/mypublicposts" routerDirection="forward"> My Public Posts</button>
			<br/>
			<button class="myButton" routerLink="/customfeedlocationupdate" routerDirection="forward">Custom  location Feed</button>
			<br/>
			<button class="myButton" routerLink="/findpeoplenearby" routerDirection="forward">FindPeopleNearby</button>
			<br/>
			<button class="myButton" routerLink="/followrequestssent" routerDirection="forward">Follow requests sent by me</button>
			<br/>

			<button class="myButton" routerLink="/followrequestsreceived" routerDirection="forward">Follow requests received by me</button>
			<br/>
			<button class="myButton" onClick={() => logout()}>Logout</button>
		</div>
		);
	};
export default MainPage;







// Do not delete ..for ref.
/*const getUsernameFromServer = async () =>{
	let ttoken="";
	var requestOptions = {
	  mode:'cors',
	  method: 'POST',
	  redirect: 'follow',
	  headers: new Headers({
		'Authorization': 'Token '+ttoken ,
		"Content-Type": "application/json"
	  }),
	};
	const status=await fetch("http://192.168.225.56:8000/whoami/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
	console.log(status," data");
}

	{uname || 'Get username,id from from server'}
	<IonButton onClick={() => getUsernameFromServer()}>uname</IonButton>
	*/
