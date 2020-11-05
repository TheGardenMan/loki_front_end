import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {IonContent} from '@ionic/react';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const Public= () => {
	return (
		<div>
		<p> Public </p>
			<Link to="/feed">
				<button class="myButton">Feed</button>
			</Link>
			<br/><br/>


			<Link to="/makepublicpost">
				<button class="myButton" > Make Public Post</button>
			</Link>
			<br/><br/>

			<Link to="/mypublicposts">
				<button class="myButton"> My Public Posts</button>
			</Link>
			<br/><br/>

			<Link to="/customfeedlocationupdate">
				<button class="myButton">Feed based on custom location</button>
			</Link>
			<br/><br/>


			<Link to="main">
				<button class="myButton"> Home </button>
			</Link>
		</div>
		);
	};
export default Public;
