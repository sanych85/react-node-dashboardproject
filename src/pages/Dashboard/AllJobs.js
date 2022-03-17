import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { JobsContainer, SearchContainer } from '../../components';
const AllJobs = () => {

  return (
    <>
      <SearchContainer />
      <JobsContainer/>
    </>
  );
};

export default AllJobs;
