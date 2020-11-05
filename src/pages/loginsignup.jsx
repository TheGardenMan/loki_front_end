// 80.2785,13.0878
import React ,{useState,useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {IonContent} from '@ionic/react';
import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

const LoginSignupPage=  () => {
	return (
		<div>
		<b>Login / Signup</b>

		<br/><br/>
			<Link to="/login">
				<button class="myButton"> Login </button>
			</Link>
		<br/>
		<br/>
			<Link to="/signup">
				<button class="myButton"> Signup </button>
			</Link>
		</div>
		);
	};
export default LoginSignupPage;