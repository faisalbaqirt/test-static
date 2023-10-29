import { useState, useEffect } from "react";
import axios from "axios";
import { getOrdersByMonth, getSalesByMonth } from "../utils/orderAPI";
import { Line, Bar } from "react-chartjs-2";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [ordersChartData, setOrdersChartData] = useState()
  const [chartMonths, setChartMonths] = useState([]);
  const [salesChartData, setSalesChartData] = useState()
  ;

  useEffect(() => {
    fetchData();
    fetchChartData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );
      const data = response.data;
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  
  const fetchChartData = async () => {
    try {
      const currentDate = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 5);

      const months = [];
      const totalOrdersData = [];
      const totalSalesData = []

      for (let i = 0; i < 6; i++) {
        const year = sixMonthsAgo.getFullYear();
        const month = sixMonthsAgo.getMonth() + 1;

        // Fetch data for orders in a specific month
        const orderData = await getOrdersByMonth(year, month);
        const totalOrders = orderData.length;

        const salesData = await getSalesByMonth(year, month);
        const totalSales = salesData.total_sales;

        months.push(new Date(year, month - 1).toLocaleString("default", { month: "long" }));
        totalOrdersData.push(totalOrders);
        totalSalesData.push(totalSales);

        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 1);
      }

      setChartMonths(months);
      setOrdersChartData(totalOrdersData);
      setSalesChartData(totalSalesData)

    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const chartOrdersData = {
    labels: chartMonths,
    datasets: [
      {
        label: "Total Orders",
        data: ordersChartData,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartSalesData = {
    labels: chartMonths,
    datasets: [
      {
        label: "Total Sales",
        data: salesChartData,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <>
      <div className="container" id="productlist">
        <div className="content-title text-center">
          <h2>Product List</h2>
        </div>
        <div className="dashboard">
          <div className="col-md-3 text-bg-dark dashboard-item">
            <div className="card text-bg-dark">

            Total Products: {dashboardData.totalProducts}
            </div>
          </div>
          <div className="col-md-3 text-bg-dark dashboard-item">
            <div className="card text-bg-dark ">
                <div className="row">
                    <div className="col">
                        <h3 className="text-light">Total Orders</h3>
                        <div>{dashboardData.totalProducts}</div>
                    </div>
                    <div className="col-auto col">
                        <div className="icon-dash">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-3 text-bg-dark dashboard-item">
            <div className="card">

            Total Orders: {dashboardData.totalOrders}
            </div>
          </div>
          <div className="col-12 chart-line" style={{backgroundColor: "white"}}>
        <Line data={chartOrdersData} />

          </div>
          <div className="col-12" style={{backgroundColor: "white"}}>
        <Bar data={chartSalesData} />

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
