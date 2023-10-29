import Header from "./Header";
import FormOrder from "./FormOrder";
import OrderList from "./OrderList";
import ProductList from "./ProductList";
import AdminDashboard from "./AdminDashboard";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  {
    path: "/header",
    name: "Header",
    icon: "bi bi-house",
    component: <Header />,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: "bi bi-people",
    component: <FormOrder />,
    layout: "/admin",
  },
  {
    path: "/productlist",
    name: "Products",
    icon: "bi bi-grid",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    path: "/listorders",
    name: "Orders",
    icon: "bi bi-table",
    component: <OrderList />,
    layout: "/admin",
  },
];
export default routes;
