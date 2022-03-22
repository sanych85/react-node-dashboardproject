import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, ChartsContainer, Loading } from '../../components';


const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <div>
      <StatsContainer />
      {monthlyApplications && monthlyApplications.length >0 && <ChartsContainer/>}
      
    </div>
  );
};

export default Stats;
