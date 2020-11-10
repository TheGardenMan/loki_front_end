import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {IonContent} from '@ionic/react';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const Private= () => {
	return (
		<div>
		<p> Private </p>
			<Link to="/privatefeed">
				<button class="myButton">Private Feed</button>
			</Link>
			<br/><br/>


			<Link to="/makeprivatepost">
				<button class="myButton" > Make Private Post</button>
			</Link>
			<br/><br/>

			<Link to="/myprivateposts">
				<button class="myButton"> My Private Posts</button>
			</Link>
			<br/><br/>

			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</div>
		);
	};
export default Private;
