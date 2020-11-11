// 80.2785,13.0878
import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {IonContent} from '@ionic/react';
import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const MainPage=  () => {
	const [username,setUsername]=useState("");
	const [infoMsg,setInfoMsg]=useState("");
	const [token,setToken]=useState("token is not loaded yet");
	const history = useHistory();

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
		const response=await fetch("http://lokidev.herokuapp.com/logout/", requestOptions);
		console.log(response);
		if (response.status===200)
		{
			console.log("logout success");
			await Storage.remove({key:'token'});
			console.log("Token deleted ");
			await Storage.remove({key:'username'});
			console.log("Username deleted ");
			history.push("/loginsignup");
		}
		else
		{
			setInfoMsg("Couldn't logout..");
		}


	}
	async function fetchUsernameFromLocalStorage ()	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
		let temp = await Storage.get({ key: 'username' });
		setUsername(temp.value);
		}

	useEffect(() => {
			fetchUsernameFromLocalStorage();

		},[]);

	return (
		<div>
			<p>Hello {username}! </p>
			<Link to="/public">
				<button class="myButton" > Public </button>
			</Link>
			<br/>
			<br/>

			<Link to="/findpeoplenearby">
				<button class="myButton"> Find people </button>
			</Link>

			<br/><br/>

			<Link to="/followers">
				<button class="myButton"> Followers </button>
			</Link>
			
			<br/><br/>

			<Link to="/private">
				<button class="myButton"> Private </button>
			</Link>

			<br/><br/>
			<button class="myButton" onClick={() => logout()}>Logout</button>
			{infoMsg}
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
	const status=await fetch("http://lokidev.herokuapp.com/whoami/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
	console.log(status," data");
}

	{uname || 'Get username,id from from server'}
	<IonButton onClick={() => getUsernameFromServer()}>uname</IonButton>
	*/
