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
];

const userRoutes = [
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
    path: "/dash-board",
    pageName: "Dashboard",
    component: Dashboard,
  },
];

export { mainRoutes, adminRoutes, userRoutes };
