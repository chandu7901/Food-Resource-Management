import './AdminAbsenceView.css'
import Navbar from './NavbarAdmin'
import axios from 'axios'
import { useEffect ,useState } from 'react';

//@todo add message post request

const AdminAbsenceView = () =>{

  
    const [ Message1, SetMessage ] = useState(" ")
    const handlechange = (e) => {
      const data = e.target.value;
      SetMessage(data);
    }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const token=localStorage.getItem('admintoken')
    // console.log(token)
    try{

      const config={
        headers:{
          'Content-type':'application/json',
          "x-auth-token" : `${token}`
        }
      }
   
      const res= await axios.post('/api/admin/wastage',{message:Message1},config)  
      alert("Message saved succesfully")
      SetMessage("")
 

    }
    catch(err)
    {
    console.log(err)
    }
    // console.log(Message1)
    // post rquest 
    
  }
  const [fetchedData,setFetched]=useState({})

  useEffect(async()=>{
    const data1 = await axios.get("/api/admin/addDetails"); //total cons , service name
    const data2= await axios.get("/api/responses");   ///api/responses // no of absent for lunch and dinner
    // console.log(data1.data,data2.data)
    setFetched({total:data1.data.totalRegistered,lunch:data2.data.responsesLunch,dinner:data2.data.responsesDinner})
  },[])
  return (
    <div>
        <Navbar/>
        <form onSubmit={handleSubmit}>
        <div id='content' className='card'>
            <span id='no_of_users'>Total no.of consumers</span>
            <br></br>
            <span id='data_first' style={{fontWeight:'bold',fontSize:'24px'}}>{fetchedData.total || "No data available currently"}</span>
            <br></br>
            <span id='no_of_lunch_responces'>People attending lunch</span>
            <br></br>
            <span id='data_second'  style={{fontWeight:'bold',fontSize:'24px'}}>{(fetchedData.total-fetchedData.lunch)||"No data available currently"}</span>
            <br></br>
            <span id='no_of_dinner_responces'>People attending dinner</span>
            <br></br>
            <span id='data_third'  style={{fontWeight:'bold',fontSize:'24px'}}>{(fetchedData.total-fetchedData.dinner)|| "No data available currently"}</span>
            <br></br>
        </div>
        <div id='message-box' className='card'>
            <p>Type any message here</p>
            <textarea onChange={handlechange} className="text_space" value={Message1} placeholder="Remember, be nice!" cols="30" rows="5"/>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  );
}


export default AdminAbsenceView;