import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobsContainer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs } = useAppContext();
  useEffect(() => {
    getAllJobs();
  }, []);
  console.log(jobs, 'jobs');
  if (isLoading) {
    return <Loading center  />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job {jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs ">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* <Loading center /> */}
    </Wrapper>
  );
};

export default JobsContainer;
