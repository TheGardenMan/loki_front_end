import { IonContent, IonPage, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
// Picker is that picker,EmojiData is a datatype
import { Picker, EmojiData } from "emoji-mart";
import { inject, observer } from "mobx-react";
import { MoodStore } from "./MoodService";
type HomeProps = {
    moodStore: MoodStore,
};
const Editor: React.FC<HomeProps> = ({ moodStore }) => {
	const [showInputs, setShowInputs] = useState(false);
	const [emoji, setEmoji] = useState<any>(null);

	const handleEmojiSelect = (selection: EmojiData) => {
	    setEmoji(selection);
	    // Show the Input text box after an emoji is selected
	    setShowInputs(true);
	};
	return (
		<IonPage>
			<IonContent className="ion-padding">
				<p>Type it up</p>h
				<Picker 
					title="Moodular"
					include={["people"]} 
					onSelect={handleEmojiSelect} 
				/>

				<IonAlert
					isOpen={showInputs}
					subHeader="Add more details or set the time/date for your mood"
					onDidDismiss={() => setShowInputs(false)}
					header={`Add Details`}
					inputs={[
								 {
									type: "text",
									name: "details",
									placeholder: "Write out how you are feeling..."
								},
								{
									name: "date",
									type: "date",
									max: `{new Date()}`,
									min: "2017-09-09",
									value: new Date(),
									placeholder: "Change date"
								}
							]}
					buttons={[
						{
							text: "Cancel",
							role: "cancel",
							cssClass: "secondary",
							handler: () => {
												setShowInputs(false);
												setEmoji(null);
											}
						},
						{
							text: "Confirm",
							handler: data => {
								//emoji lives in state
								moodStore.save(emoji, data.details, data.date)
							}
						}
					]}
				/>
			</IonContent>
		</IonPage>
	);
};
// cd /d D:\Projects\FaceLoci\
// Observe the editor. Give Editor access to moodSotre
export default inject("moodStore")(observer(Editor));