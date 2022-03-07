
import main from '../assets/images/main.svg';
import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from '../components';
import {Link} from "react-router-dom"
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/* <img src={logo} alt="jobify" className="logo" /> */}

        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span>app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quas explicabo, commodi, iure dolorum alias similique assumenda
            minus illo voluptates velit, sint cupiditate praesentium. Quidem
            laudantium mollitia corporis doloremque voluptatibus.
          </p>
          <Link to = "/register" className="btn btn-hero">Login/register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main main-img" />
      </div>
    </Wrapper>
  );
};



export default Landing;
