import { Link } from "react-router-dom";
import { routes } from "utils";

const AppFooter = () => {
  return (
    <footer className='bg-gray-200 text-center lg:text-left'>
      <div className='text-gray-700 text-center p-4 bg-[rgba(0, 0, 0, 0.2)]'>
        <p className='float-start mb-0'>
          <Link className='text-muted text-decoration-none hover:cursor-pointer' to={routes.landingPage}>
            <strong>Copyright Arslan Ali </strong>
          </Link>
          &copy; {new Date().getFullYear()}
        </p>
        <a className='text-gray-800' href='https://tailwind-elements.com/'>
          Task
        </a>
      </div>
    </footer>
  );
};

export default AppFooter;
