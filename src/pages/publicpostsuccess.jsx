import React ,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
const PublicPostSuccess=  () => {
	useEffect(() => {
		},[]);
	return (
		<>
			<p>Your post has been made successfully!</p>
			<Link to="public">
				<button class="myButton"> Back </button>
			</Link>
		</>
		);
	};
export default PublicPostSuccess;