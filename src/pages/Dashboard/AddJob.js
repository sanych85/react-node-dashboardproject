import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useNavigate } from 'react-router-dom';
const AddJob = () => {
  const navigate = useNavigate()
  const {
    showAlert,
    jobLocation,
    jobTypeOptions,
    jobType,
    displayAlert,
    position,
    company,
    status,
    statusOptions,
    isEditing,
    handleChange,
    clearValues,
    createJob,
    isLoading,
    editJob
    
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("value", value)
    // console.log(handleChange,"handleChange");
    console.log(name, "name", value, "value")
    console.log(e.target, "e.target")
    handleChange({name, value})
  };
  const handleSubmit = (e) => {
    console.log("isEditing", isEditing)
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if(isEditing) {
      editJob()
      navigate('/jobs')
      return
    }
    createJob()
  };
  return (
    <Wrapper>
      <form className=" form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button className="btn btn-block submit-btn" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-block clear-btn" onClick={clearValues} disabled = {isLoading}>
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
