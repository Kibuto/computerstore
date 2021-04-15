import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getDashboard`)
      .then((res) => setData(res.data.data));
  }, []);
  const tinhtien = () => {
    let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      let index = new Date(data[i].created_at).getMonth();
      let productArr = data[i].products;
      let total = 0;
      for (let j = 0; j < productArr.length; j++) {
        total += parseInt(productArr[j].price);
      }
      temp[index] += total;
    }
    return temp;
  };
  const tinhdon = () => {
    let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      let index = new Date(data[i].created_at).getMonth();
      let productArr = data[i].products;
      for (let j = 0; j < productArr.length; j++) {
        temp[index] += 1;
      }
    }
    return temp;
  };

  return (
    <div className="dashboard-wrapper">
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <Chart
          options={{
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
            },
          }}
          series={[
            {
              name: "Tổng thu: ",
              data: tinhtien(),
            },
          ]}
          type="bar"
          width="1200"
        />
        <p class="text-center font-weight-bold">Tình hình đầu vô năm 2021 </p>
        <Chart
          options={{
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
            },
          }}
          series={[
            {
              name: "Tổng số đơn: ",
              data: tinhdon(),
            },
          ]}
          type="bar"
          width="1200"
        />
      </div>

      <p class="text-center font-weight-bold">Tình hình đơn năm 2021 </p>
    </div>
  );
};
export default Dashboard;
