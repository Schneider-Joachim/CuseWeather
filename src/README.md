When copy pasting/ duplicating a react file, *DELETE* the node modules because their file size is enormous and it will take forever for the files to be copied. With that said, once youre in your IDE, npm start won't work because you don't have the modules, so open the integrated term and run npm i/npm install to redownload the modules, then you can run npm start and everything is fine and dandy. 



If using class in React, you must change it to className 
--------
You must pass in objects in React, not strings because you will get an error. For example:
Before: 
    <div><span style="font-weight:bold">℉</span> | ℃ </div>
After:
    <div><span style={{fontWeight:"bold"}}>℉</span> | ℃ </div>
---------    
When creating your own component, you use TitleCase/NameCase as the naming convention to tell it apart from native HTML components or your own created components (every first letter is capatilized) 
EX: const ForecastDay = () => {}

ForecastDay is a component created from a function, a functional component. To call it, we put it in a closing tag. 
  EX:  <ForecastDay/>
Components are useful because of their reuseability. you can create a component once and use it anywhere in the code. 

To pass information into a component/edit a component, we use the concept of property(props). You can create multiple props.
EX: <ForecastDay  day="Mon" />
Remeber to pass in the props into the functions parameters in order to have it render. you can pass in multiple props. 
const ForecastDay = ({day})  as seen on line 49. 
--------
In React, When you want to make an API call when the page *first* loads, need to use useEffect(); you want the useEffect to load the first time the page loads, so you need to end it with , [] so you don't make too many API calls.
EX: useEffect(()=>{}, [])
--------