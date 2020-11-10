import React ,{useState,useEffect} from 'react';
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
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
// import './theme/variables.css';
import './theme.css';




//PLugins
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import MainPage from './pages/main';
import FeedPage from './pages/feed';
import MakePublicPost from './pages/makepublicpost';
import PublicPostSuccess from './pages/publicpostsuccess';
import MyPublicPosts from './pages/mypublicposts';

import MakePrivatePost from './pages/makeprivatepost';
import PrivatePostSuccess from './pages/privatepostsuccess';
import PrivateFeedPage from './pages/privatefeed';
import CustomFeed from './pages/customfeed';
import SetCustomLocation from './pages/customfeedlocationupdate';
import FindPeopleNearby from './pages/findpeoplenearby';
import FollowRequestsSent from './pages/followrequestssent';
import FollowRequestsReceived from './pages/followrequestsreceived';
import Public from './pages/public';
import Followers from './pages/followers';
import MyFollowers from './pages/myfollowers';
import MyFollowees from './pages/myfollowees';
import LoginSignupPage from './pages/loginsignup';
import MyPrivatePosts from './pages/myprivateposts';
import Private from './pages/private';
// Dont make App async
const { Filesystem,Storage } = Plugins;
const App =  () => {
	let nextPageURL="/main";

	async function loginsignupOrMainPage() {
		const { value } = await Storage.get({ key: 'token' });
		if (value ===null) 
		{
			console.log("AppPage:token is null.Going to loginsignup");
			nextPageURL="/loginsignup";
		}
		else
		{
			console.log("AppPage:Going to MainPage")
		}
	}
	useEffect(() => {
		loginsignupOrMainPage();
	},[]
	)
	

return(
<IonApp>
	<IonReactRouter>
		<IonRouterOutlet>
			<Route path="/login" component={LoginPage} exact={true} />
			<Route path="/signup" component={SignupPage} exact={true} />
			<Route path="/main" component={MainPage} exact={true} />
			<Route path="/feed" component={FeedPage} exact={true} />
			<Route path="/makepublicpost" component={MakePublicPost} exact={true} />
			<Route path="/publicpostsuccess" component={PublicPostSuccess} exact={true} />
			<Route path="/mypublicposts" component={MyPublicPosts} exact={true} />
			<Route path="/makeprivatepost" component={MakePrivatePost} exact={true} />
			<Route path="/privatepostsuccess" component={PrivatePostSuccess} exact={true} />
			<Route path="/customfeed" component={CustomFeed} exact={true} />
			<Route path="/customfeedlocationupdate" component={SetCustomLocation} exact={true} />
			<Route path="/findpeoplenearby" component={FindPeopleNearby} exact={true} />
			<Route path="/followrequestssent" component={FollowRequestsSent} exact={true} />
			<Route path="/followrequestsreceived" component={FollowRequestsReceived} exact={true} />
			<Route path="/followers" component={Followers} exact={true} />
			<Route path="/myfollowers" component={MyFollowers} exact={true} />
			<Route path="/myfollowees" component={MyFollowees} exact={true} />
			<Route path="/public" component={Public} exact={true} />
			<Route path="/private" component={Private} exact={true} />
			<Route path="/privatefeed" component={PrivateFeedPage} exact={true} />
			<Route path="/myprivateposts" component={MyPrivatePosts} exact={true} />
			<Route path="/login" component={LoginPage} exact={true} />
			<Route path="/loginsignup" component={LoginSignupPage} exact={true} />
			<Route path="/" render={() => <Redirect to={nextPageURL} />} exact={true} />
		</IonRouterOutlet>
	</IonReactRouter>
</IonApp>
);
};
export default App;

