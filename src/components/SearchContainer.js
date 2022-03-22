import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
    
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    console.log(e.target.name);
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e)=> {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form action="">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            value={searchStatus}
            labelText="status"
            name="searchStatus"
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            value={searchType}
            labelText="type"
            name="searchType"
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            value={sort}
            labelText="sort"
            name="sort"
            handleChange={handleSearch}
            list={['all', ...sortOptions]}
          />
          <button
            className="btn btn-block btn-danger "
            disabled={isLoading} onClick= {handleSubmit}>Submit</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
