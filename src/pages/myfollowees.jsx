import React ,{useState,useEffect,useRef} from 'react';
import {Link} from "react-router-dom";
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

const MyFollowees=  () => {
	const [token,setToken]=useState("token is not loaded yet");
	const [users,setUsers]=useState("Loading people you follow");

	async function showRequests ()	{
		let x=await Storage.get({ key: 'token' });
		var requestOptions = {
		mode:'cors',
		method: 'POST',
		redirect: 'follow',
		headers: {
				'Authorization': 'Token '+(x.value) ,
				'Content-Type': 'application/json'
				},
		};
		const user_ids=await fetch("http://lokidev.herokuapp.com/followees/", requestOptions).then( yy => {return yy.json();});
		if (user_ids==0)
		{
			setUsers("You don't follow anyone.");
		}
		else
		{
			// Show usernames and delete_follow_req_sent button 
			let temp_users=[]
			for(let user_id_ in user_ids)
			{
				requestOptions.body=JSON.stringify({user_id:user_ids[user_id_]});
				const username=await fetch("http://lokidev.herokuapp.com/get_username/", requestOptions).then( response => response.json());
				temp_users.push(<p><i>{username}</i></p>);
				// ToDo:Unfollow Button
				// temp_users.push(<button value={user_ids[user_id_]} onClick={deleteFollowRequest}>Delete follow request</button>);
				// temp_users.push(<button value={user_ids[user_id_]} onClick={acceptFollowRequest}>Accept follow request</button>);
			}
			temp_users.push(<br></br>)
			setUsers(temp_users)
		}
		}
	useEffect(() => {
		showRequests();
		},[]);
	return (
		<IonContent>
			<p>People I follow</p>
			{users}
		<br/><br/>
		<Link to="followers">
			<button class="myButton"> Back </button>
		</Link>

		<Link to="main">
			<button class="myButton"> Home </button>
		</Link>
		</IonContent>
		);
	};
export default MyFollowees;