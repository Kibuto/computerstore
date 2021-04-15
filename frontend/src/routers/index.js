import Login from "../pages/Login";
import Registration from "../pages/Registration";
import {
  Home,
  Products,
  Product,
  Cart,
  Confirm,
  Category,
  OrderHistory,
  ManagementProducts,
  ManagementUser,
  ManagementOrder,
  CreateProduct,
  Dashboard,
  Profile,
  CreateCategory,
  ManagementCategory,
  EditOrder,
} from "./lazyRoutes";

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
    path: "/category/:id",
    pageName: "Category",
    component: Category,
  },
  {
    path: "/login",
    pageName: "Login",
    component: Login,
  },
  {
    path: "/registration",
    pageName: "Registration",
    component: Registration,
  },
];

const userRoutes = [
  {
    path: "/profile",
    pageName: "Profile",
    component: Profile,
  },
  {
    path: "/confirm",
    pageName: "Confirm",
    component: Confirm,
  },
  {
    path: "/order-history",
    pageName: "OrderHistory",
    component: OrderHistory,
  },
];

const adminRoutes = [
  {
    path: "/management-products",
    pageName: "ManagementProducts",
    component: ManagementProducts,
  },
  {
    path: "/management-category",
    pageName: "ManagementCategory",
    component: ManagementCategory,
  },
  {
    path: "/management-user",
    pageName: "ManagementUser",
    component: ManagementUser,
  },
  {
    path: "/management-order",
    pageName: "ManagementOrder",
    component: ManagementOrder,
  },
  {
    path: "/create-product",
    pageName: "CreateProduct",
    component: CreateProduct,
  },
  {
    path: "/create-category",
    pageName: "CreateCategory",
    component: CreateCategory,
  },
  {
    path: "/edit-order",
    pageName: "EditOrder",
    component: EditOrder,
  },
  {
    path: "/dash-board",
    pageName: "Dashboard",
    component: Dashboard,
  },
];

export { mainRoutes, adminRoutes, userRoutes };
