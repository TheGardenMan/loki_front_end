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

const MakePublicPost=  () => {
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

	let publicPostData=await fetch("http://192.168.225.56:8000/public_post_request/", requestOptions)
	  .then(response => response.text())
	  .then(result => {return result;})
	  .catch(error => { console.log("error"); return null;});
	return JSON.parse(publicPostData);
}

async function handleImageUpload(event){
	console.log("--------- pub post create start ---------")
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
	let publicPostData=await getUploadUrl();
	if (publicPostData==null)
	{
		setInfoMsg("Error occurred.No connection");
	}
	console.log("publicPostData",publicPostData)
	// ToDo:Round the coords before sending.They are too accurate x.yyy is enough
	var myHeaders = new Headers();
	var requestOptions = {
	  method: 'PUT',
	  headers: myHeaders,
	  body: fileToUpload,
	  redirect: 'follow'
	};
	console.log("S3 upload started .Filename is ",publicPostData.filename);
	try{
		let res =await fetch(publicPostData.url, requestOptions);
		// ToDo:Check if S3 fails with wrong url..
		console.log(" S3 upload done ",res);		
		console.log(" public_post_success started");
		var requestOptions = {
		  mode:'cors',
		  method: 'POST',
		  redirect: 'follow',
		  headers: {
		  		'Authorization': 'Token '+token ,
				'Content-Type': 'application/json'
			},
		  body:JSON.stringify({public_post_id:publicPostData.public_post_id,longitude:location.coords.longitude,latitude:location.coords.latitude})
		};
		const response=await fetch("http://192.168.225.56:8000/public_post_success/", requestOptions)
		// .then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));
		console.log(" public_post_success done ",response);
		console.log("--------- pub post create end --------- Going to publicpostsuccess");
		history.push("/publicpostsuccess");
	}
	catch(e)
	{
		console.log("Error while MakePublicPost " ,e);
	}

	}


	useEffect(() => {
		bogusAsync();
	},[]
	)
	return (
		<IonContent>
			<p>MakePublicPost page</p>
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
			<Link to="public">
				<button class="myButton"> Back </button>
			</Link>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</IonContent>
		);
	};
export default MakePublicPost;