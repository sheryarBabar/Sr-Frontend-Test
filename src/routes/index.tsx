import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppWeather, PageNotFound, SplashScreen, Users } from "../containers";
import AppLayout from "../layout";
import { routes } from "../utils";
import ProtectedRoute from "./protected-route";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.splashScreen} element={<SplashScreen />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.landingPage} element={<Users />} />
          <Route path={routes.weather} element={<AppWeather />} />
        </Route>
        <Route path={routes[404]} element={<PageNotFound />} />
        <Route path='*' element={<Navigate to={routes[404]} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
