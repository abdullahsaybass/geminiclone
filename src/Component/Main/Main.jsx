import React from 'react'
import '../Main/Main.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../contex/Context'


const Main = () => {

    const{onSent,setInput, input, showResult,recentPrompt,resultData,loading} = useContext(Context);
   
  return (
    <div className='main'>
        <div className="nav">
            <p>Zenith AI</p>
            <img src= {assets.user_icon} alt='user-icon' />
        </div>
        <div className="main-container">

            {!showResult ? 
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How Can I Help You Today?</p>
                </div> :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="user-icon"/>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="resultdata">
                        <img src={assets.gemini_icon} alt="gemini-icon"/>
                        {loading ? 
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                            
                        </div>  
                        : 
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
            }
            
            <div className="mainbottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt='gallery-icon'/>
                        <img src={assets.mic_icon} alt='mic-icon'/>
                        {input ? <img onClick = {()=> onSent()}src ={assets.send_icon} alt = 'send-icon'/> : null}
                    </div>
                </div>
                <p className="bottom-info">Gemini may display inaccurate info, including people, so double-check its response. Your privacy and Gemini Apps</p>
            </div>
        </div>
    </div>
  )
}

export default Main