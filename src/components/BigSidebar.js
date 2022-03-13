import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/BigSidebar';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';
const BigSidebar = () => {
  const { isToggleSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          isToggleSidebar
            ? 'sidebar-container'
            : 'sidebar-container  show-sidebar'
        }>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
