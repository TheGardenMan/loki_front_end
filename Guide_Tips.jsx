// From old learn.js
// Here "./" means same folder as the folder which contains this file
state={}
x={'key':value,'key':value,'key':value}
y={
	'key':[{'key':value,'key':value}]
}
function_name=(arg1,arg2) => {
	data section
	 	this.state={data:arg2+arg1}
	render section
	return(
		<div key="1">{this.state.data}</div>
		)
}

component_name=({arg1,arg2}) => {
	data section
	 	data=sss
	render section
	return(
		aaa
		)
}
const x=[];
content inside const can change.But you cant make it point to something new.
Eg.You can modify it using x.push().. But you cant do like x=some_new_arr_or_func_etc.

let x=[];
Unlike const,let can me made to point to something else.

const x=[1,2,3,4];
// for loop for arrays
x.forEach(each_element_of_x_is_available_here_in_this_variable=>
{
do something with each_element_of_x_is_available_here_in_this_variable;
});

*State is always passed from a parent down to a child component as props. It should never be passed to a sibling or a parent component.

*Each child in a list should have a unique "key" prop.If a "list " ("[]") is gonna have many div''s then,..
 							<div key={pno_and_data.pno}>
								<b>{pno_and_data.pno}</b>
								<i>{pno_and_data.data}</i>
								<br></br>
							</div>
* Modify a state using setState() only.Don''t use anything else.
* During setState(),
	*right* clearly state like this.setState({key:new_value(s)}) and pass to Another component like this.state.key..
	DONT do like below
	 	*wrong* this.setState(value),for passing to another this.state

* You can overwrite one element of state without changing the whole state,like this:
        this.setState({
            element_name: event.target.value
        })
        Another use 
        this.setState({
            [event.target.name]: event.target.value
        })
        
*let y={a:1,b:2,c:3}
*let x={...y,d:4} Here ... means extract all properties of y. Hence the result is x={a:1,b:2,c:3,d:4}

 *() => {} anonymous function
 *Access props
 	"Inside" a tag <div key=this.props.prop_name></div>
 	"between" open and closed tags -- notice the "{}"- <div> {this.props.prop_name} </div>
 * When creating state inside a constructor
 	this.state = {value: null,};
 *When creaing a state directly inside a function or class (i.e above the render())
 	state = {value: null,};
 *When passing a function as a props,pass it as "a call inside an anonymous function" (() =>this.callMe() )
 	callMe(){
 	}
  	<Some toCall={() =>this.callMe()} />

 *When  accessing the func received as props,
 <Rvd onClick={this.props.toCall}/>
 	or
 <Rvd onClick={() =>this.props.toCall()}/>
 	Both work.	
 ***If you want a function to be accessed from a child,it should be defined as an arrow function.. Like x=() =>{}... If its accessed only locally,then x(){}

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


//If you call a function inside a component,it will get called every time the Component render.SO call it inside useEffect
Dont do this
	component x =...{
		const y = async ()
		{

		}
		y();
		return...
	}
Do this
	component x =...{
		const y = async ()
		{

		}
		//**
			useEffect(() => {
			   y();
			},[]);
		//**
		return...
	}

all Const should come after all imports
//Doubt:How to state in react.. diff bw Component and const in react-ionic
use onIonInput={(e) => password_check(e.target.value)} instead of onIonChange

// To be able to scroll,put content inside IonContent.Simply,,put all return (..) inside IonContent
return(
	<IonContent>
	all content 
	</IonContent>
	)
// To extract data from servers response ,use this.It will give you raw data while stripping all headers,etc
const response2=await fetch("http://192.168.225.56:8000/public_feed/", requestOptions).then( reply => {return reply.json();})

// Import a component 
	import C from '..//..';
	// use it 
	<C/>
	NOT {C}

//event.target.style,disbaled.etc still works
function showPeople(event)
{
	event.target.color="red";
}
<IonButton onClick={showPeople}>Show people</IonButton>

//Write everything as a component

//You can use html tags in logic section directly.Push them to a list and put the list name in render section, they will be rendered.But they wont be re-rendered while the main array changes.[ToCheck]