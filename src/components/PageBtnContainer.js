import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
const PageBtnContainer = () => {
  const { numOfPages, page } = useAppContext();
  const nextPage = () => {};
  const prevPage = () => {};
 const pages = Array.from({length:numOfPages}, (_,index)=>{
    return index+1
 })
  return (
    <Wrapper className="btn-container">
        
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      {pages.map((pageNumber, index)=> {
          return <button type = "button" key = {index} className={pageNumber === page?"pageBtn active":"pageBtn"} onClick = {()=>console.log("change")}>{pageNumber}</button>
      })}
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
