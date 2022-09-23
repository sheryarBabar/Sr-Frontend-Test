import { useEffect, useRef } from "react";
import { useCurrentUser } from "context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { memoryStrings, routes, sls } from "utils";

const SplashScreen = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    let token = sls.decode(memoryStrings.authorizationToken);
    if (token) {
      navigate(routes.landingPage, { replace: true });
    }
  }, []);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userName = ref.current?.value;
    if (userName) {
      setCurrentUser(userName);
      sls.encode(memoryStrings.authorizationToken, userName);
      toast.success(`Welcome ${userName}`, { icon: "🎱" });
      navigate(routes.landingPage, { replace: true });
    } else {
      toast.error("Please enter your name!");
    }
  };
  return (
    <div className='grid h-screen place-items-center'>
      <div className='flex flex-col'>
        <img alt='' className='h-40 object-contain App-logo' src='/react-logo.png' />
      </div>
      <form className='w-full max-w-sm' onSubmit={handleClick}>
        <div className='flex items-center border-b border-app-color py-2'>
          <input
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type='text'
            placeholder='Full name'
            aria-label='Full name'
            ref={ref}
          />
          <button
            className='flex-shrink-0 bg-app-color hover:bg-primary-hover border-app-color hover:border-primary-hover text-sm border-4 text-white py-1 px-2 rounded'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SplashScreen;
