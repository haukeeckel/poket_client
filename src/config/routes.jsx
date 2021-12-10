import * as PATHS from '../utils/paths';
import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';

const routes = (props) => {
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNIN,
      element: <SignIn {...props} />,
    },
  ];
};

export default routes;
