import { Home, Products, Product, Cart, Confirm, Category } from "./lazyRoutes";
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
    path: "/cart",
    pageName: "Cart",
    component: Cart,
  },
  {
    path: "/confirm",
    pageName: "Confirm",
    component: Confirm,
  },
  {
    path: "/category/:id",
    pageName: "Category",
    component: Category,
  },
  {
    pageName: "NotFound",
    component: NotFound,
  },
];

export default mainRoutes;
