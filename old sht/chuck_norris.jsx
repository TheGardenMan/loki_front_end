// LW:All that you have to write is React code only.Write everything as JSX.Use capacitor APIs wherever necessary for native functions.
/*	Logic,stateManagement,APIs,everything etc ---> React
		All UI things -- Ionic Components
		Storage,Camera,Native functions -- Capacitor
*/

import React, { useState } from 'react';
import { decode } from 'he';

import {
	IonApp, 
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonInput,
	IonList,
	IonItem,
	IonLabel,
	IonButton
} from '@ionic/react';


const Page = () => {
	// const [ email, setEmail ] = useState('');
	// const [ password, setPassword ] = useState('');

	// const [ formErrors, setFormErrors ] = useState({});
	const [joke,setJoke]=useState('');
	const submit = async () => {
			// setFormErrors("Yup");
	}
	const fetchJoke = async signal => {
	  const url = new URL('https://api.icndb.com/jokes/random');
	  const response = await fetch(url, { signal });
	  const { value } = await response.json();
	  setJoke(decode(value.joke));
	};
	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						Login
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{joke || 'Click the button below to load the joke!'}
				<br/>
				<IonButton onClick={() => fetchJoke()}>Get a joke</IonButton>
			</IonContent>
			{/*<IonContent>
				<form onSubmit={(e) => { e.preventDefault(); submit();}}>
					<div>
						{JSON.stringify(formErrors)}
					</div>
					<IonList>
						<IonItem>
							<IonLabel>Email</IonLabel>
							<IonInput name="email" type="email" value={email} onIonChange={(e) => setEmail(e.target.value)}/>
						</IonItem>
						<IonItem>
							<IonLabel>Password</IonLabel>
							<IonInput name="password" type="password" value={password} onIonChange={(e) => setPassword(e.target.value)}/>
						</IonItem>
					</IonList>
					<IonButton expand={true} type="submit">Log in</IonButton>
				</form>
			</IonContent>*/}
		</>
	)
}
export default Page;
