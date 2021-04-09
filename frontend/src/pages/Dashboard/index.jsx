import axios from "axios";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getDashboard`)
      .then((res) => console.log(res.data.data));
  }, []);

  return <div className="dashboard-wrapper">hihi</div>;
};

export default Dashboard;
