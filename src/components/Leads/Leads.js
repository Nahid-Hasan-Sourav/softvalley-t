import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import userPro from "../../assets/img/user (2).png";

const Leads = () => {
  const { user } = useContext(AuthContext);
  const [status,setStatus]=useState(null);
  const [sources,setSources]=useState(null);
  const [assigne,setAsigne]=useState(null);
  console.log("This is from leads components ", user);

    useEffect(()=>{
        fetch(`http://crm.softvalley.sveducrm.com/api/admin/base/lead-status`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This get status from leads",data);
        setSources(data.data);
        
      });
    },[])
    useEffect(()=>{
        fetch(`http://crm.softvalley.sveducrm.com/api/admin/base/source`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This get sources from leads",data);
        setSources(data.data);
        
      });
    },[])
    useEffect(()=>{
        fetch(`http://crm.softvalley.sveducrm.com/api/admin/base/assignee`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
       
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This get assigne from leads",data);
        setAsigne(data.data);
        
      });
    },[])

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

      <div className="p-4 bg-gray-200 ">
        <input
          type="text"
          placeholder="Search in leads table"
          className="input w-full max-w-xs"
        />
      </div>
      <div className="grid grid-cols-5 gap-3 p-4">
        <div>
          <select className="select select-bordered w-full rounded-none">
            <option  selected>
             Statuses
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>

        <div>
          <select className="select select-bordered rounded-none w-full">
            <option disabled selected>
              Sources
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>

        <div>
          <select className="select select-bordered rounded-none w-full">
            <option disabled selected>
              Assignees
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div>
          <select className="select select-bordered rounded-none w-full ">
            <option disabled selected>
              Condacted date
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>

        <div className="flex items-center">
        <button className="btn mr-2 btn-sm">Filter</button>
        <button className="btn btn-sm ">Reset Filter</button>
        </div>
      </div>
    </div>
  );
};

export default Leads;
