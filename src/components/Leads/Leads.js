import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import userPro from "../../assets/img/user (2).png";


import Datepicker from "react-tailwindcss-datepicker"; 
import { toast } from "react-hot-toast";



const Leads = () => {
  const { user } = useContext(AuthContext);
  const [status,setStatus]=useState(null);
  const [sources,setSources]=useState(null);
  const [assigne,setAsigne]=useState(null);

  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
    }); 

    const handleValueChange = (newValue) => {
      console.log("newValue:", newValue); 
      setValue(newValue); 
      } 

      console.log("newValue 2:", value);

  // console.log("This is from leads components ", status);

    useEffect(()=>{
        fetch(`https://crm.softvalley.sveducrm.com/api/admin/base/lead-status`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("This get status from leads",data.data);
        setStatus(data);
        
      });
    },[])
    useEffect(()=>{
        fetch(`https://crm.softvalley.sveducrm.com/api/admin/base/source`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("This get sources from leads",data);
        setSources(data);
        
      });
    },[])
    useEffect(()=>{
        fetch(`https://crm.softvalley.sveducrm.com/api/admin/base/assignee`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("This get assigne from leads",data);
        setAsigne(data);
        
      });
    },[])


    const handleSubmit=(e)=>{
      e.preventDefault();
      const form=e.target;
      const searchValue=form.searchValue.value;
      const status=form.status.value;
      const sources=form.sources.value;
      const assignes=form.assignes.value;
      const body={
        search:searchValue,
        lead_status_id:[status],
        source_id:[sources],
        user_id:[assignes],
        contacted_date_from:value.startDate,
        contacted_date_to:value.endDate,
      }

      console.log("This all data for get search data after search ",body);



      fetch(`https://crm.softvalley.sveducrm.com/api/admin/lead/list?page=1&limit=10`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after filter data",data);
        window.localStorage.setItem("soft-valley", data.data.token);
        if(data.success){
          toast.success(data.message);
          
        }
        else{
          toast.error("Please again login")
        }
      });





    }

  return (
    <div className="h-full">
      <div className="bg-white p-4 flex justify-between">
        <div>
          <h4>Leads</h4>
          <p className="text-mute">
            Difficulties increase the nearer we get to the goal
          </p>
          <p></p>
        </div>
        <div>
          <img src={userPro} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="p-4 bg-gray-200 ">
        <input
          type="text"
          placeholder="Search in leads table"
          name="searchValue"
          className="input w-full max-w-xs"
        />
      </div>
      <div className="grid grid-cols-5 gap-3 p-4">
        <div>
          <select className="select select-bordered w-full rounded-none"
          name="status"
          >
            <option  selected>
             Statuses
            </option>
            {
              status?.data?.map((item)=>{
               return (
               <option value={item.id}>{item.id}</option>
               )
              })
            }
          </select>
        </div>

        <div>
          <select className="select select-bordered rounded-none w-full" 
          name="sources"
          >
            <option disabled selected>
              Sources
            </option>
            {
              sources?.data?.map((item)=>{
               return (
               <option value={item.id}>{item.id}</option>
               )
              })
            }
          </select>
        </div>

        <div>
          <select className="select select-bordered rounded-none w-full" name="assignes">
            <option disabled selected>
              Assignees
            </option>
           {
            
              assigne?.data?.map((item)=>{
               return (
               <option value={item.id}>{item.id}</option>
               )
              })
            
           }
          </select>
        </div>
        <div>
        <Datepicker 
value={value} 
onChange={handleValueChange} 
/> 
        </div>

        <div className="flex lg:flex-row items-center flex-col">
        <button className="btn mr-2 btn-sm" type="submit">Filter</button>
        <button className="btn btn-sm lg:my-0 my-3">Reset Filter</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Leads;
