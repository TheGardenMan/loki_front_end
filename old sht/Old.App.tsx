import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, triangle} from 'ionicons/icons';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
// new
import "emoji-mart/css/emoji-mart.css";
// 
import { Provider } from "mobx-react";
import { create } from "mobx-persist";
import { MoodStore } from "./pages/MoodService";
// . means this folder
import Diary from './pages/diary';
import Editor from './pages/editor';

const App: React.FC = () => {
	// create a "create " instance
	const hydrate = create({});
	// Cr moodStore instance
	const moodStore = new MoodStore();
	// copy localStore moodStore to RAM
	hydrate("moodStore", moodStore);
	return(
  <IonApp>
  //Add moodStore instance to global
  <Provider moodStore={moodStore}>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/diary" component={Diary} exact={true} />
          <Route path="/editor" component={Editor} exact={true} />
          <Route path="/" render={() => <Redirect to="/diary" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="1" href="/diary">
            <IonIcon icon={triangle} />
            <IonLabel>Diary!</IonLabel>
          </IonTabButton>
          <IonTabButton tab="2" href="/editor">
            <IonIcon icon={square} />
            <IonLabel>Editor!</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </Provider>
  </IonApp>
  );
};

export default App;

