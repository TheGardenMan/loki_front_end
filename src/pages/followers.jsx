import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {IonContent} from '@ionic/react';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const Followers= () => {
	return (
		<div>
		<p> Follow Menu </p>
			<br/>
			<Link to="/followrequestssent">
				<button class="myButton">Follow requests sent by me</button>
			</Link>
			<br/><br/>

			<Link to="/followrequestsreceived">
				<button class="myButton" > Follow requests received by me</button>
			</Link>
			<br/><br/>

			<Link to="/myfollowers">
				<button class="myButton"> My followers </button>
			</Link>
			<br/><br/>

			<Link to="/myfollowees">
				<button class="myButton">People I follow</button>
			</Link>

			<br/><br/>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</div>
		);
	};
export default Followers;
