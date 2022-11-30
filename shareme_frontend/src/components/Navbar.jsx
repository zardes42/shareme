import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {IoMadd , IoMdSearch } from  'react-icons/io'
const Navbar = ({searchTerm , setSearchTerm , user}) => {
  const navigate = useNavigate()
  if(!user) return null;
  return (
    <div>Navbar</div>
  )
}

export default Navbar