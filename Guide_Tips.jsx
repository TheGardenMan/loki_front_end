onClick
	// // Called only when clicked
	<IonButton onClick={() => functioName()}> MMM	</IonButton>
	// // Called continiously.IDK why.DNU
	<IonButton onClick={functioName()}> MMM	</IonButton>
	// Doesn't work
	<IonButton onClick={fetchJoke}> MMM	</IonButton>

Show if exists else show something else
	{variables || "This will be shown if variables don't exist"}

// Use  onIonInput or onIonChange instead of onChange
<IonInput required name="password" type="password" onIonInput={(e) => password_check(e.target.value)}/>

// Correct way to send a fetch request.(To get json data instead of Promise).That "then " part is important.We are sedning everthing as formData.CHange it in future
var formdata = new FormData();
formdata.append("username", username_to_test);
var requestOptions = {
  mode:'cors',
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
const response=await fetch("http://127.0.0.1:8000/username_check/", requestOptions).then( response => response.json().then(receivedData => ({status:response.status,data:receivedData})));

// put "await" before any function call to make it blocking even if it doesnt return anything.If it returns ,you can access it inside "then".But it should be inside an async function
await x().then(res=>{log(res)});

// Put all routes in App.tsx for easy access.Unless you wanna mention them inside other compnonents(not tested).
    <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/signup" component={SignupPage} exact={true} />
          <Route path="/test" component={Tester} exact={true} />
          <Route path="/" render={() => <Redirect to="/signup" />} exact={true} />
        </IonRouterOutlet>
    </IonReactRouter>

// Do not use anything other than "key,value" for variable names in secure storage.It will not work.It will be stored as undefined.Dont use const if you wanna change later.Here let is used since I have to reuse it later.
	let key = 'username';
	let value = response.data.username;
	await SecureStoragePlugin.set({ key, value })
	  .then(success => console.log(success))
	await SecureStoragePlugin.get({ key })
	  .then(value => {
	    console.log(value);
	  })
	  .catch(error => {
	    console.log('Item with specified key does not exist.');
	  });
NOT shit like kkk,vv etc
	let kkk='uu';
	let vv='ss';
	await SecureStoragePlugin.set({ kkk, vv })
  .then(success => console.log(success))

//SecureStoragePlugin returns an object.Get the value like below before rendering it via HTML.Because React doesn't render Objects.
		let key='username';
		temp=await SecureStoragePlugin.get({ key })
		  .then(value => {
		  	 console.log(value," xxx");
		    return value;
		  })
		  .catch(error => {
		    console.log('Item with specified key does not exist.');
		    return "Error at MainPage";
		  });
		  setUsername(temp.value)
//Plugins should NOT be imported first.Core modules first.Plugins next.


//Doubt:How to state in react.. diff bw Component and const in react-ionic
