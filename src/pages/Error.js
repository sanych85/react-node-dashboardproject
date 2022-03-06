import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from "../assets/images/not-found.svg"
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="" />
        <h3>Ohh! Page not found</h3>
      <Link to = "/">back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error