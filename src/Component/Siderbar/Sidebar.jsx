import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../contex/Context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const{onSent,setRecentPrompt,prevPrompt,newChat} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='Sidebar'>

      <div className="top">
        <img onClick = { ()=>setExtended(prev => !prev) }className = "menu"src = {assets.menu_icon} alt = "menu-icon" />
        <div onClick = {() => newChat()}className="newchat">
          <img src={assets.plus_icon} alt = "plus-icon" />
          {extended?<p>New Chat</p> : null}
        </div>
        {extended ?
        <div className="recent">
          <p className="recent-chat">Recent</p>
          {prevPrompt.slice(0, 5).map((item,index) =>{
            return (
            <div key = {index} onClick = {()=> loadPrompt(item)}  className="recent-entry">
            <img src={assets.message_icon} alt = "message-icon" />
            <p>{typeof item === 'string' ? item.slice(0, 10) : item.prompt.slice(0,10)} ...</p> 
          </div> )
          } )}
          
        </div>
        : null}
      </div> 

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt = "question-icon" />
          {extended ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt = "question-icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt = "question-icon" />
          {extended ? <p>settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar