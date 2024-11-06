import {Navigate} from "react-router-dom";

const PrivateRoute = ({element}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    if (role === "ADMIN") {
      return <Navigate to='/admin' />;
    }
    return element;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
