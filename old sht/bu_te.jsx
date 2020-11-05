import React ,{useState,useEffect} from 'react';
import {
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	IonContent
} from '@ionic/react';

const CustomFeed=  () => {
	const [longitude,setLongitude]=useState("");
	const [latitude,setLatitude]=useState("");
	// LW:Update location to server.Get feed and display.Just copy paste from feed.jsx
	async function updateLocation() {
		
	}
	useEffect(() => {
		},[]);
	return (
		<IonContent>
		<IonItem>
		<IonLabel>Longitude</IonLabel>
		<IonInput type="text" placeholder="Enter maximum 3 decimal digits"  onIonInput={(e) => setLongitude(e.target.value)}></IonInput>
		</IonItem>
		<IonItem>
		<IonLabel>Latitude</IonLabel>
		<IonInput type="text" placeholder="Enter maximum 3 decimal digits"  onIonInput={(e) => setLatitude(e.target.value)}></IonInput>
		</IonItem>
		<IonButton onClick={() => updateLocation()}>{feedButtonMessage}</IonButton>
		</IonContent>
		);
	};
export default CustomFeed;