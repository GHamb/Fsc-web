import React, { useEffect } from 'react'
import { useState } from 'react'
import{HeartIcon} from'@heroicons/react/outline'
import axios from 'axios'
import avatar from './avatar.png'

import {useFormik} from 'formik'

const MAX_TWT_CHAR =140

function TweetForm({loggedInUser, OnSuccess}){
   
   const formik = useFormik({
     onSubmit: async (values, form ) => {
         await axios({
           method:'post',
           url:`${import.meta.env.VITE_API_HOST}/tweets`,
           headers:{
            'authorization': `Bearer ${loggedInUser.accessToken}`
           },
           data:{
             text: values.text
           },
         })
         form.setFieldValue('text',''),
         OnSuccess()

     },
      initialValues:{
       text:''
     }
   })

  //  function changeText(e){
  //    setText(e.target.value)
  //  }

  
   
  
  return(
    <div className='border-bottom border-silver p-4 space-y-6'>
      <div className='flex p-4 space-x-5'>
        <img src={avatar} alt="" className='w-7' />
        <h1 className='font-bold text-xl '>pagina Inicial</h1>

      </div>
      <form className='pl-12 text-lg flex flex-col' onSubmit={formik.handleSubmit}>
        <textarea name="text" value={formik.values.text} 
          className='bg-transparent outline-none disabled:opacity-40'  placeholder='O que esta acontecendo ?'
          onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={formik.isSubmitting} />

        <div className='flex justify-end items-center space-x-3'>
          <span className='text-sm'>
            <span >{formik.values.text.length}</span> / <span className='text-birdBlue'>{MAX_TWT_CHAR}</span>
          </span>
          <button type='submit' className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-40' disabled={formik.values.length > MAX_TWT_CHAR || formik.isSubmitting} >
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
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`,{
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
    <TweetForm loggedInUser={loggedInUser} OnSuccess={getData}/>
      {data.length && data.map(tweet =>(
        <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="src/avatar.png">
          {tweet.text}
        </Tweet>

      ))}
      
      
    </>
  )
}

