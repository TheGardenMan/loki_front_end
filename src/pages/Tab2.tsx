import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';

const Tab2: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};

export default Tab2;




// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
// import { camera, trash, close } from 'ionicons/icons';
// import ExploreContainer from '../components/ExploreContainer';
// import './Tab2.css';
// import { usePhotoGallery } from '../hooks/usePhotoGallery';

// const Tab2: React.FC = () => {
// 	// 
// 	const { photos, takePhoto } = usePhotoGallery();
// 	return (
// 		<IonPage>

// 			<IonHeader>
// 				<IonToolbar>
// 					<IonTitle>Photo gallery</IonTitle>
// 				</IonToolbar>
// 			</IonHeader>
			
// 			<IonContent fullscreen>
// 				<IonHeader collapse="condense">
// 					<IonToolbar>
// 						<IonTitle size="large">Tab 2</IonTitle>
// 					</IonToolbar>
// 				</IonHeader>
// 				<ExploreContainer name="Tab 2 page" />
// 			</IonContent>
// 			{/*Maavu 1 th,feed 2 hands,panju half bucket,1 kodam water*/}
// 			<IonContent>
// 				<IonGrid>
// 				  <IonRow>
// 				    {photos.map((photo, index) => (
// 				      <IonCol size="6" key={index}>
// 				        <IonImg src={photo.webviewPath} />
// 				      </IonCol>
// 				    ))}
// 				  </IonRow>
// 				</IonGrid>
// 				<IonFab vertical="bottom" horizontal="center" slot="fixed">
// 				  <IonFabButton onClick={() => takePhoto()}>
// 				    <IonIcon icon={camera}></IonIcon>
// 				  </IonFabButton>
// 				</IonFab>
// 			</IonContent>
			
// 		</IonPage>
// 	);
// };

// export default Tab2;
