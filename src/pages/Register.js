import { useState, useEffect } from 'react';
import { FormRow, Logo, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
  showAlert: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    setupUser,
  } = useAppContext();
  console.log(isLoading);
  //global state and useNavigate
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    
    if (!email || !password) {
      console.log('something missing');
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endpoint: 'login',
        alertText: 'Register successful! Redirecting',
      });
      console.log('already a member');
    } else {
      setupUser({
        currentUser,
        endpoint: 'register',
        alertText:  'Login successful! Redirecting',
      });
    }
    console.log(values);
  };
  // useEffect(()=>{
  //   if(user) {
  //     setTimeout(()=> {
  //       navigate('/')
  //     }, 3000)

  //   }
  // }, [user,navigate])
  return (
    <Wrapper classname="full-page">
      <form action="" className="form">
        <Logo />

        <h3> {values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            labelText="name"
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        <FormRow
          labelText="password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />
        <FormRow
          labelText="email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-block"
          onClick={onSubmit}>
          Submit
        </button>
        <p></p>
        {values.isMember ? 'not a member yet' : 'already member'}
        <button type="button" onClick={toggleMember} className="member-btn">
          {!values.isMember ? 'login' : 'register'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
