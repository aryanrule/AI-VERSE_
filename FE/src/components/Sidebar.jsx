import './Sidebar.css'
import { assets } from '../assets/assets/assets'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../Context/Context'

const Sidebar = () => {
    const [extended , SetExtended]  =  useState(false);
  
    const HandleSidebar = () => {
        SetExtended(!extended);


    }


    //getting the functionality to be used in the sidebar component 
       
        const {generateAnswer ,  setRecentPrompt , previousPrompt} = useContext(Context);
  
  return (
    <div className='sidebar'>

        <div className='sidebar-top'>

          <img onClick={HandleSidebar} className='menu'  src={assets.menu_icon} alt=""/>

          <div className='new-chat'>
            <img src={assets.plus_icon}/>
            {extended ? <p>New Chat</p> :null}
          </div>

         {extended? 

            <div className='recent'>
             <p className='Recent-text'>Recent</p>
             { 
                previousPrompt.map((item , index)=> {
                    return (
                      <div className='recent-items'>
                         <img src={assets.message_icon}/>
                         <p>{item.slice(0,18)}...</p>
                      </div>
                    )
                })
             }
            </div> : null}

        </div>

        <div className='sidebar-bottom'>
            <div className='bottom-item recent-items'>
                <img src={assets.question_icon}/>
                {extended? <p>Help</p>:null}
            </div>
            <div className='bottom-item recent-items'>
                <img src={assets.history_icon}/>
                {extended? <p>Activity</p>:null}
            </div> 
            <div className='bottom-item recent-items'>
                <img src={assets.setting_icon}/>
                {extended? <p>Setting</p>:null}
            </div>
        </div>

    </div>
    
  )
}

export default Sidebar