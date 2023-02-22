import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/img/logo (1).png'
import { BiUser } from 'react-icons/bi';
import {MdDashboard } from 'react-icons/md';
import {RiUserSearchLine} from 'react-icons/ri';
import {FiUsers} from 'react-icons/fi';
import {GoThreeBars} from 'react-icons/go';
import {FcSalesPerformance} from 'react-icons/fc';
import sale from '../../assets/img/sale.png'
import expense from '../../assets/img/current-expense.png'

const Dashboard = () => {
    let activeStyle = {
        backgroundColor: "#2563eb",
        color:"white"
      };
    return (
      <div>
        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content relative">
            <Outlet></Outlet>
            <label
              htmlFor="my-drawer-2"
              className="btn  drawer-button lg:hidden absolute top-[100px] right-[20px]"
            >
             <GoThreeBars/>
            </label>
          </div>
          <div className="drawer-side border">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            
            <ul className="menu p-4 w-80 bg-gray-500 z-10 lg:bg-gray-300 text-base-content h-100">
            <div>
                <img src={logo} className="w-[200px]"/>
                <div className='flex items-center'>
                    <div  className='bg-gray-400 w-10 h-10 flex items-center justify-center rounded-[50%] mr-3'>
                    <BiUser className='text-xl'/>
                    </div>
                    <div>
                        <p>Hello! Good Evening</p>
                        <p className='font-bold'>Admin</p>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
              <NavLink
                to={`dashboard/dashboard`}
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
               
              >
              <li>
                <a><span><MdDashboard/></span>Dashboard</a>
              </li>
              </NavLink>

             <NavLink to='/dashboard/leads'
             
             style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
             
             > 
             <li>
                <a><span><RiUserSearchLine/></span>Leads</a>
              </li>
             </NavLink>

              <NavLink to="dashboard/customer"
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
               
              >
              <li>
                <a><span><FiUsers/></span>Customer</a>
              </li>
              </NavLink>

           <NavLink
           to={`dashboard/sales`}
             style={({ isActive }) =>
             isActive ? activeStyle : undefined
           }
            
           >
              <li>
                <a><span><img src={sale} className="w-[16px] h-[16px]"/></span>Sales</a>
              </li>
            </NavLink>

              <NavLink
              to={`dashboard/expense`}
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
               
              >
              <li>
                <a><span><img src={expense} className="w-[16px] h-[16px]"/></span>Expense</a>
              </li>

              </NavLink>
              <button className='btn mt-10 bg-[#2563eb] text-white'>LOGOUT</button>

            </ul>
          
          </div>
        </div>
      </div>
    );
};

export default Dashboard;