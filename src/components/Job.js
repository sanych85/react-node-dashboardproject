import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import JobInfo from './JobInfo';
import Wrapper from '../assets/wrappers/Job';
import { Link } from 'react-router-dom';
const Job = ({
  _id,
  position,
  jobLocation,
  jobType,
  status,
  company,
  createdAt,
}) => {
  const { setEditJob, deleteJob } = useAppContext();
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation}></JobInfo>
          <JobInfo icon={<FaCalendarAlt />} text={date}></JobInfo>
          <JobInfo icon={<FaBriefcase />} text={jobType}></JobInfo>
          <div className={`${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}>
              Edit
            </Link>
            <button
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
              type="button">
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
