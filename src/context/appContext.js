import React from 'react';
import { useContext, useReducer } from 'react';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_ALL_JOBS_BEGIN,
  GET_ALL_JOBS_SUCCESS,
  GET_ALL_JOBS_ERROR,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
} from './actions';
import reducer from './reducer';
import axios from 'axios';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  isToggleSidebar: false,
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'decline', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios.
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    console.log('dispatch');
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
  const addUserToLocalStorage = (user, token, location) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    console.log(currentUser);
    console.log('endpoint', endpoint);
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, token, location } = data;
      console.log(user, token);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage(user, token, location);
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
    console.log(currentUser);
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage(user, token, location);
    } catch (err) {
      if (err.response.status !== 404) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.data.msg },
        });
      }
    }

    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    const { jobLocation, position, company, jobType, token, status } = state;
    const job = {
      jobLocation,
      position,
      company,
      jobType,
      token,
      status,
    };
    try {
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      await authFetch.post('/jobs', job);
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };
  const getAllJobs = async () => {
    dispatch({ type: GET_ALL_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get('/jobs');
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_ALL_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
      console.log(jobs);
    } catch (err) {
      console.log(err);
      // logoutUser()
      // dispatch({ type: GET_ALL_JOBS_ERROR });
    }
    clearAlert();
  };
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = () => {
    console.log(`edit job`);
  };
  const deleteJob = async (jobId) => {
    dispatch({type: DELETE_JOB_BEGIN})
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getAllJobs()
    }
    catch(err) {
      console.log(err.response)
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
        editJob,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
