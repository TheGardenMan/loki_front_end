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

const FollowRequestsReceived=  () => {
	const [token,setToken]=useState("token is not loaded yet");
	const [users,setUsers]=useState("Loading follow requests.. ");

	async function deleteFollowRequest(event) {
		event.persist();
		// getElem works!
		// console.log(document.getElementById("1").value)
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
		const res=await fetch("http://192.168.225.56:8000/delete_received_follow_request/", requestOptions)
		console.log(res);
		if (res.status=="200")
		{
			event.target.innerHTML="Request accepted";
			event.target.disabled="disabled";
		}

	}

	async function acceptFollowRequest(event) {
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
		const res=await fetch("http://192.168.225.56:8000/accept_follow_request/", requestOptions)
		console.log(res);
		if (res.status=="200")
		{
			event.target.innerHTML="Request accepted";
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
		const user_ids=await fetch("http://192.168.225.56:8000/follow_requests_received/", requestOptions).then( yy => {return yy.json();});
		if (user_ids==0)
		{
			setUsers("You have not received any requests.");
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
				// ToDo:Disable delete button after accept and vice versa."id" and getElemB.. works
				temp_users.push(<button class="myButton" value={user_ids[user_id_]} onClick={deleteFollowRequest}>Delete follow request</button>);
				temp_users.push(  <button class="myButton" value={user_ids[user_id_]} onClick={acceptFollowRequest}>Accept follow request</button>);
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
			<p>Follow requests received</p>
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
export default FollowRequestsReceived;