import React ,{useState,useEffect} from 'react';
import {
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	IonContent
} from '@ionic/react';
import { Plugins } from '@capacitor/core';
const {Geolocation,Storage} = Plugins;

const FeedPage=  () => {
	const [infoMsg,setInfoMsg]=useState("");
	const [token,setToken]=useState("token is not loaded yet");
	const [posts,setPosts]=useState("");
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}
	async function showFeed() {
		let location;
		try
		{
			location = await Geolocation.getCurrentPosition();
		}
		catch(e)
		{
			setInfoMsg(("Cannot access location. "+e.message));
			return;
		}
		// ToDo:Round the coords before sending.They are too accurate x.yyy is enough
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
		  body:JSON.stringify({longitude:location.coords.longitude,latitude:location.coords.latitude})
		};
		// console.log(requestOptions);
		const response=await fetch("http://192.168.225.56:8000/update_user_location/", requestOptions);
		// console.log(response)
		requestOptions.body="";
		const publicFeedPosts=await fetch("http://192.168.225.56:8000/public_feed/", requestOptions).then( reply => {return reply.json();})
		console.log(publicFeedPosts);
		let keys=["user_id","public_post_id","views","likes","dislikes","url"];
		let post_details=[];

		for (let key in publicFeedPosts) {
			let post_detail={};
			// key ===> 0,1,2...
			for (let key2 in publicFeedPosts[key])
			{
				let key_name=keys[key2];
				// key_name="user_id",....
				post_detail[key_name]=publicFeedPosts[key][key2];
				// here eg "user_id":1
			}
			post_details[key]=post_detail;
		}
		// LW:Get lastpost's user_id and post_id and get new feed and render using {...cc,y}
			const content = post_details.map((post) =>
			  <div key={post.user_id+"_"+post.public_post_id}>
			    <img style={{width: 200, height: 200}} atl="" src={post.url}/>
			    <p>Views {post.views}</p>
			    <p>Likes {post.likes}</p>
			    <p>Dislikes {post.dislikes}</p>
			  </div>
			);
			setPosts(content);
			console.log(typeof(content));
		return;
	}
	useEffect(() => {
		bogusAsync();
		},[]);
	return (
		<IonContent>
			<p>Feed page</p>
			<IonButton onClick={() => showFeed()}> See feed</IonButton>
			{posts}
		</IonContent>
		);
	};
export default FeedPage;