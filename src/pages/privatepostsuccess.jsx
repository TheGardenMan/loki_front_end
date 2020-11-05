import React ,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
const PrivatePostSuccess=  () => {
	useEffect(() => {
		},[]);
	return (
		<>
			<p>Your private post has been made successfully!</p>
			<Link to="private">
				<button class="myButton"> Back </button>
			</Link>
		</>
		);
	};
export default PrivatePostSuccess;