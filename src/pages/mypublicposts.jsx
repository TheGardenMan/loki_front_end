import React ,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	IonContent
} from '@ionic/react';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem,Storage } = Plugins;
const MyPublicPosts=  () => {
	const [token,setToken]=useState("token is not loaded yet");
	const [postDetails,setPostDetails]=useState("");
	const [infoMsg,setInfoMsg]=useState("");
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}
	async function getMyPublicPosts()
	{
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: new Headers({
			'Authorization': 'Token '+token ,
		  }),
		};
		const status=await fetch("http://lokidev.herokuapp.com/public_posts/", requestOptions).then( response => {return response.json();})
		let keys=["user_id","public_post_id","views","likes","dislikes","url"];
		let post_details=[];
		if (status==0)
		{
			setInfoMsg("You have not made any posts");
		}
		for (let key in status) {
			let post_detail={};
			// key ===> 0,1,2...
			for (let key2 in status[key])
			{
				let key_name=keys[key2];
				// key_name="user_id",....
				post_detail[key_name]=status[key][key2];
				// here eg "user_id":1
			}
			/* O/P of post_detail is
			dislikes: 0
			likes: 0
			public_post_id: 1
			url: "https://lokiproject.s3.amazonaws.com/public_170_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWOUNMIQJMISHWLY2%0A%2F20201021%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20201021T131114Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=10e6211acd199fa845d4eff1e542f368880c65ecdf3284f0357cc66fab7e044f"
			user_id: 170
			views: 0
			*/
			post_details[key]=post_detail;
		}
			// console.log(post_details);
			// setPostDetails(post_details);
			// https://codelikethis.com/lessons/react/rendering-multiple-components
			const content = post_details.map((post) =>
			  <div key={post.user_id+"_"+post.public_post_id}>
			    <img style={{width: 200, height: 200}} atl="" src={post.url}/>
			    {/*<p>Views {post.views}</p>*/}
			    {/*<p>Likes {post.likes}</p>*/}
			    {/*<p>Dislikes {post.dislikes}</p>*/}
			  </div>
			);
			setPostDetails(content);
			// console.log(content);
	}

	useEffect(() => {
		bogusAsync();
		},[]);
	return (
		<IonContent>
			<p>My Public Posts</p>
			{postDetails}
			<button class="myButton" onClick={() => getMyPublicPosts()}>See them</button>
			<br/>
			<b>{infoMsg}</b>
				

			<Link to="public">
				<button class="myButton"> Back </button>
			</Link>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</IonContent>
		);
	};
export default MyPublicPosts;