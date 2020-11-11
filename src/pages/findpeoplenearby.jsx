import React ,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {
	IonInput,
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonButton
} from '@ionic/react';
import { Plugins } from '@capacitor/core';
const {Geolocation,Storage} = Plugins;

const FindPeopleNearby=  () => {
	const [token,setToken]=useState("token is not loaded yet");
	// ToDo:Update location before seeing people.Your location maynot be in the table
	const [users,setUsers]=useState(null);
	var requestOptions = {
	  mode:'cors',
	  method: 'POST',
	  redirect: 'follow',
	  headers: {
	  		'Authorization': 'Token '+token ,
			'Content-Type': 'application/json'
		},
	};
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}
	async function sendFollowRequest(event) {
		console.log(event.target.value);
		// Otherwise event will become null after first attribute access
		event.persist();
		requestOptions.body=JSON.stringify({user_id:event.target.value})
		const response=await fetch("http://lokidev.herokuapp.com/follow/", requestOptions)
		if (response.status==200)
		{
			event.target.innerHTML="Request sent";
			event.target.disabled="disabled";
		}
	}
	async function showPeople(event) {
		setUsers("Accessing location...");
		let location;
		// ToDo:Access location only during first req.Otherwise its meaningless to show "next N posts in this area"
		try
		{
			location = await Geolocation.getCurrentPosition();
		}
		catch(e)
		{
			console.log(e.message)
			// setInfoMsg(("Cannot access location. "+e.message));
			return;
		}
		// ToDo:Round the coords before sending.They are too accurate x.yyy is enough
		console.log(location.coords.longitude," ...",location.coords.latitude)
		requestOptions.body=JSON.stringify({longitude:location.coords.longitude,latitude:location.coords.latitude});
		const res=await fetch("http://lokidev.herokuapp.com/update_user_location/", requestOptions);

		setUsers("Loading nearby users.. Please wait.");
		const user_ids=await fetch("http://lokidev.herokuapp.com/find_nearby_people/", requestOptions).then( response => response.json());
		console.log(user_ids);
		let users=[];
		if (user_ids=="0")
		{
			setUsers("There are no users in your area.");
		}
		else
		{
			// follow_statuses=[];//1.Not following 2.Request sent 3.Following
			for (let user_id_ in user_ids)
			{
				requestOptions.body=JSON.stringify({user_id:user_ids[user_id_]});
				const username=await fetch("http://lokidev.herokuapp.com/get_username/", requestOptions).then( response => response.json());
				let follow_status=await fetch("http://lokidev.herokuapp.com/follow_status/", requestOptions).then( response => response.json());
				users.push(<p>{username}</p>);
				if (follow_status==1)
				{
					users.push(<button class="myButton" value={user_ids[user_id_]} onClick={sendFollowRequest}>Follow</button>)
				}
				else if (follow_status==2)
				{
					users.push(<button class="myButton" value={user_ids[user_id_]}>Request sent</button>)
				}
				else
				{
					users.push(<button class="myButton"  value={user_ids[user_id_]}>Following</button>)
				}
				users.push(<br/>)
			}			
			setUsers(users);
		}

	}
	useEffect(() => {
		bogusAsync();
		},[]);
	return (
			<IonContent>
				<p>People nearby</p>
				<button className="myButton" onClick={showPeople}>Show people</button>
				<br/>
				{users}

			<br/>
			<br/>
			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
			</IonContent>
		);
	};
export default FindPeopleNearby;