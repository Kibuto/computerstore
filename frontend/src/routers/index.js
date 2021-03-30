import { Home, Products, Product } from "./lazyRoutes";
import NotFound from "../pages/NotFound";

const mainRoutes = [
  {
    path: "/",
    pageName: "Home",
    exact: true,
    component: Home,
  },
  {
    path: "/products",
    pageName: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    pageName: "Product",
    component: Product,
  },
  {
    pageName: "NotFound",
    component: NotFound,
  },
];

export default mainRoutes;
