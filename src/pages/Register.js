import { useState, useEffect } from 'react';
import { FormRow, Logo, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  //global state and useNavigate
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    console.log(values);
    console.log(e.target.name, 'target name');
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper classname="full-page">
      <form action="" className="form">
        <Logo />

        <h3> {values.isMember ? 'Login' : 'Register'}</h3>
        {values.showAlert && <Alert />}
        {values.isMember && (
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
          value={values.name}
        />
        <FormRow
          labelText="email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.name}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p></p>
        {values.isMember ? 'not a member yet' : 'already member'}
        <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? 'login' : 'register'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
