import React from "react";
import { useEffect, useRef} from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import routes from "../components/routes";
import "./admin.css"

const Test = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
     
          <Sidebar
            {...props}
            routes={routes}
          />
     
        <div className="admin-content" ref={mainContent}>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/admin/header" replace />} />
          </Routes>
        </div>
     
    </>
  );
};

export default Test;
