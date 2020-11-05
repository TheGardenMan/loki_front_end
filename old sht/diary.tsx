import { IonContent, IonPage } from '@ionic/react';
import React from 'react';

const Diary: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <p>Your memories</p>
            </IonContent>
        </IonPage>
    );
};

export default Diary;