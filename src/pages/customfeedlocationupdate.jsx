import React ,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	IonContent
} from '@ionic/react';
import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;
let t_latitude;
let t_longitude;
const SetCustomLocation=  () => {
	// const [longitude,setLongitude]=useState("");
	// const [latitude,setLatitude]=useState("");
	const history=useHistory();
	const [token,setToken]=useState("token is not loaded yet");
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}
	async function updateLocation(event) {
		event.preventDefault();
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({longitude:t_longitude,latitude:t_latitude}),
		};
		const response=await fetch("http://lokidev.herokuapp.com/update_user_location/", requestOptions);
		history.push("/customfeed");
		
	}
	useEffect(() => {
		bogusAsync();
		},[]);
	return (
		<IonContent>
			<form onSubmit={(event) => {updateLocation(event);}}>
			<p>Set custom location below</p>
			<p>Longitude</p>
			<input type="text"  required placeholder="xx.yyyy"  onChange={(e) => {t_longitude=e.target.value;console.log(t_longitude);}}></input>
			<p>Latitude</p>
			<input type="text" required placeholder="xx.yyyy"  onChange={(e) =>{t_latitude=e.target.value;console.log(t_latitude);}}></input>
			<br/>
			<br/>
			<button type="submit" class="myButton">See posts</button>
			</form>

			<Link to="public">
				<button class="myButton"> Back </button>
			</Link>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</IonContent>
		);
	};
export default SetCustomLocation;