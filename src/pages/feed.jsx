import React ,{useState,useEffect,useRef} from 'react';
import {Link} from "react-router-dom";
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
// Anything inside a Component gets reset except State..That too updates very slowly.So put globals outside
let firstRequest=true;
let lastpost_post_id_;
let lastpost_user_id_;
let feedEnded=false;

const FeedPage=  () => {
	const [infoMsg,setInfoMsg]=useState("");
	const [token,setToken]=useState("token is not loaded yet");
	const [posts,setPosts]=useState("");
	const [feedButtonMessage,setFeedButtonMessage]=useState("See posts!");
	const feedButtonRef=useRef();
	// Anything inside a Component gets reset except State..That too updates very slowly.So put globals outside
	// console.log("...");
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}
	async function showFeed() {
		if (feedEnded===true)
		{
			console.log("Feed end reached already");
		}
		let location;
		// ToDo:Access location only during first req.Otherwise its meaningless to show "next N posts in this area"
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
		console.log(location.coords.longitude," ...",location.coords.latitude)
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({longitude:location.coords.longitude,latitude:location.coords.latitude}),
		};
		const response=await fetch("http://lokidev.herokuapp.com/update_user_location/", requestOptions);
		console.log(firstRequest);
		if (firstRequest===true)
		{
			// Do not "false " here.It is done after creating render
			requestOptions.body="";
		 	console.log("This is firstRequest");
			setFeedButtonMessage("See more!");
		}
		else
		{
			requestOptions.body=JSON.stringify({longitude:location.coords.longitude,latitude:location.coords.latitude,lastpost_user_id:lastpost_user_id_,lastpost_post_id:lastpost_post_id_})
		  console.log("This is NOT A firstRequest");
		}

		const publicFeedPosts=await fetch("http://lokidev.herokuapp.com/public_feed/", requestOptions).then( reply => {return reply.json();})
		// console.log(publicFeedPosts);
		let keys=["user_id","public_post_id","views","likes","dislikes","url"];
		let post_details=[];
		// Since 5 posts are sent at a time,if less than 5 then no more posts!
		// If there are 5 posts and next call returns 0,still this condition will satisfy and button will be disabled.
		if (publicFeedPosts.length<5)
		{
			console.log("Less than 5 posts to show.Hence this is the last load");
			feedEnded=true;
			if(feedButtonRef.current)
			{
				// Hide the feedButton once all posts are loaded
				feedButtonRef.current.setAttribute("disabled","disabled");
				setFeedButtonMessage("You have reached the end of feed");
				console.log("feedButton disabled");
			}
			// return;
			if (publicFeedPosts.length===0 )
			{
				setFeedButtonMessage("No posts are available");
				return;
			}
		}
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
		lastpost_post_id_=post_details[post_details.length-1].public_post_id;
		lastpost_user_id_=post_details[post_details.length-1].user_id;
		const content = post_details.map((post) =>
			  <div key={post.user_id+"_"+post.public_post_id}>
			    <img style={{width: 200, height: 200}} atl="" src={post.url}/>
			    {/*<p>Views {post.views}</p>*/}
			    {/*<p>Likes {post.likes}</p>*/}
			    {/*<p>Dislikes {post.dislikes}</p>*/}
			  </div>
			);
		// console.log(content);
		if (firstRequest===true)
		{
			setPosts(content);	
			firstRequest=false;
			console.log(firstRequest);
		}
		else
		{
			// Do not use objects here..No {}..only []..Coz objs are not valid as a react child
			setPosts([...posts,...content]);
		}
		return;
	}
	useEffect(() => {
		bogusAsync();
		},[]);
		return (
					<IonContent>
						<p> Public Feed </p>
							{posts}
						<button 
							class="myButton"
							ref={feedButtonRef} 
							onClick={() => showFeed()}>
							{feedButtonMessage}
						</button>
						<br/>
						<br/>

						<Link to="public">
							<button class="myButton"> Back </button>
						</Link>

						<Link to="main">
							<button class="myButton"> Home </button>
						</Link>
					</IonContent>
				);
	};
export default FeedPage;