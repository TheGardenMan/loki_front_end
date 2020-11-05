import React ,{useState,useEffect} from 'react';
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

const FollowRequestsSent=  () => {
	const [token,setToken]=useState("token is not loaded yet");
	const [users,setUsers]=useState("Loading data...");
	async function deleteFollowRequest(event) {
		event.persist();
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
		requestOptions.body=JSON.stringify({user_id:event.target.value});
		const res=await fetch("http://192.168.225.56:8000/delete_sent_follow_request/", requestOptions)
		console.log(res);
		if (res.status=="200")
		{
			event.target.innerHTML="Request deleted";
			event.target.disabled="disabled";
		}

	}
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
		const user_ids=await fetch("http://192.168.225.56:8000/follow_requests_sent/", requestOptions).then( yy => {return yy.json();});
		if (user_ids==0)
		{
			setUsers("You have not sent any requests");
		}
		else
		{
			// Show usernames and delete_follow_req_sent button 
			let temp_users=[]
			for(let user_id_ in user_ids)
			{
				requestOptions.body=JSON.stringify({user_id:user_ids[user_id_]});
				const username=await fetch("http://192.168.225.56:8000/get_username/", requestOptions).then( response => response.json());
				temp_users.push(<p>{username}</p>);
				temp_users.push(<button class="myButton" value={user_ids[user_id_]} onClick={deleteFollowRequest}>Delete request</button>);
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
			<p>Follow requests sent</p>
			{users}

		<br/>
		<Link to="followers">
			<button class="myButton"> Back </button>
		</Link>

		<Link to="main">
			<button class="myButton"> Home </button>
		</Link>
		</IonContent>
		);
	};
export default FollowRequestsSent;