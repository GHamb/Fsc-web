import React, { useEffect } from 'react'
import { useState } from 'react'
import{HeartIcon} from'@heroicons/react/outline'
import axios from 'axios'

const MAX_TWT_CHAR =140
function TeewtForm(){
   const [text, setText] = useState("")

   function changeText(e){
     setText(e.target.value)
   }
   console.log(text)
  
  return(
    <div className='border-bottom border-silver p-4 space-y-6'>
      <div className='flex p-4 space-x-5'>
        <img src="src/avatar.png" alt="" className='w-7' />
        <h1 className='font-bold text-xl '>pagina Inicial</h1>

      </div>
      <form className='pl-12 text-lg flex flex-col'>
        <textarea name="text" value={text} className='bg-transparent outline-none disabled:opacity-40'  placeholder='O que esta acontecendo ?' onChange={changeText} />

        <div className='flex justify-end items-center space-x-3'>
          <span className='text-sm'>
            <span >{text.length}</span> / <span className='text-birdBlue'>{MAX_TWT_CHAR}</span>
          </span>
          <button className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-40' disabled={text.length > MAX_TWT_CHAR } >
            Tweet
          </button>
        </div>
        
      </form>
    </div>
  )
}

function Tweet({name,username,avatar,children}){

 
  
  return(
    <div className='flex space-x-3 p-4 border-b border-silver'>
      <div className="">
            <img src={avatar} className="tweet_img"/>
      </div>
      <div className='space-y-1'>
            <span className='font-bold text-sm'>{name}</span>{' '}
            <span className='text-sm text-silver'>@{username}</span>
            <p>
                 {children}
            </p>
            <div className='flex space-x-1 text-silver text-sm items-center'>
              <HeartIcon className='w-5 stroke-1 '/>
              <span>18.9k</span>
            </div>
            
            
      </div>
    </div>
  )
}

export function Home({loggedInUser}) {
 
  const [data, setData] = useState([])
  
  
  const loading = true

  

  async function getData(){
    const res = await axios.get('http://localhost:9901/tweets',{
      headers:{
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [loading])
  return (
    <>
    <TeewtForm/>
      {data.length && data.map(tweet =>(
        <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="src/avatar.png">
          {tweet.text}
        </Tweet>

      ))}
      
      
    </>
  )
}

