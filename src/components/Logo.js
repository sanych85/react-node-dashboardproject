import styled from 'styled-components';
import logo from '../assets/images/logo.svg';

const Logo = ({src}) => {
  return (
    <div><img src={logo} alt="jobify" className="logo"  /></div>
  )
}

export default Logo