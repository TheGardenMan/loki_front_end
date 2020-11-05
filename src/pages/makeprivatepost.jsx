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
import { useHistory } from "react-router-dom";
import { Plugins } from '@capacitor/core';
const { Storage,Geolocation } = Plugins;

const MakePrivatePost=  () => {
	const history = useHistory();
	const [img_preview_src,img_preview_src_setter]=useState("");
	const [infoMsg,setInfoMsg]=useState("");
	const submitRef=useRef();
	// You cant access files during submit.You can access them only during onChange.Hence put them to state..
	const [fileToUpload,setFileToUpload]=useState(null);
	// DND:Keep the token in state only.
	const [token,setToken]=useState("token is not loaded yet");
	async function bogusAsync()
	{
		let x=await Storage.get({ key: 'token' });
		setToken(x.value);
	}

// Get Upload URL
async function getUploadUrl() {
		var requestOptions = {
		mode:'cors',
		method: 'POST',
		redirect: 'follow',
		headers: {
	  			'Authorization':'Token '+token
	  		},
	};
	console.log(token," .......")

	let privatePostData=await fetch("http://192.168.225.56:8000/private_post_request/", requestOptions)
	  .then(response => response.text())
	  .then(result => {return result;})
	  .catch(error => { console.log("error"); return null;});
	return JSON.parse(privatePostData);
}

async function handleImageUpload(event){
	console.log("--------- private post create start ---------")
	event.preventDefault();
	setInfoMsg("Please wait while the image is uploaded");
	// ToDo:This is gonna fuck up some day.Store location as a global var.
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

	
	if(submitRef.current)
	{
		submitRef.current.setAttribute("disabled","disabled");
		console.log("Submit disabled");
	}
	console.log(location," ....00");
	// LW:Disable submit button on click
	let privatePostData=await getUploadUrl();
	if (privatePostData==null)
	{
		setInfoMsg("Error occurred.No connection");
	}
	console.log("privatePostData",privatePostData)
	// ToDo:Round the coords before sending.They are too accurate x.yyy is enough
	var myHeaders = new Headers();
	var requestOptions = {
	  method: 'PUT',
	  headers: myHeaders,
	  body: fileToUpload,
	  redirect: 'follow'
	};
	console.log("S3 upload started .Filename is ",privatePostData.filename);
	try{
		let res =await fetch(privatePostData.url, requestOptions);
		// ToDo:Check if S3 fails with wrong url..
		console.log(" S3 upload done ",res);		
		console.log(" private_post_success started");
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
		  body:JSON.stringify({private_post_id:privatePostData.private_post_id,longitude:location.coords.longitude,latitude:location.coords.latitude})
		};
		const response=await fetch("http://192.168.225.56:8000/private_post_success/", requestOptions)
		// .then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
		console.log(" private_post_success done ",response);
		console.log("--------- private post create end --------- Going to privatepostsuccess");
		history.push("/privatepostsuccess");
	}
	catch(e)
	{
		console.log("Error while MakePrivatePost " ,e);
	}

	}


	useEffect(() => {
		bogusAsync();
	},[]
	)
	return (
		<IonContent>
			<p>Make Private Post page</p>
			<form onSubmit={(event) => {handleImageUpload(event);}}>
			<input required type="file" onChange={(event) => 
						{	
							img_preview_src_setter(URL.createObjectURL(event.target.files[0]));
							setFileToUpload(event.target.files[0]);
						}}/>
			<img style={{width: 200, height: 200}} src={img_preview_src}/> 
			<br/>
			<button class="myButton" type="submit" ref={submitRef}>Post</button>
			</form>
			{infoMsg}

			<br/>

			<Link to="private">
				<button class="myButton"> Back </button>
			</Link>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</IonContent>
		);
	};
export default MakePrivatePost;