import React from 'react'
import {NavLink , Link} from 'react-router-dom'
import {RiHomeFill } from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'

const Sidebar = ({user,closeToggle}) => {
  const handleCloseSidebar =() => {
    if(closeToggle) closeToggle(false)
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar '>
      <div className="flex flex-col ">
        <Link to={'/'} onClick={ handleCloseSidebar} className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
          <img src={logo} alt="logo" className='w-full' />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar