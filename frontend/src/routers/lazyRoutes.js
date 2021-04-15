// libs
import { lazy } from "react";
// others
import { delayLazy } from "../utils";

export const Home = lazy(() => delayLazy()(import("../pages/Home")));
export const Products = lazy(() => delayLazy()(import("../pages/Products")));
export const Product = lazy(() => delayLazy()(import("../pages/Product")));
export const Cart = lazy(() => delayLazy()(import("../pages/Cart")));
export const Confirm = lazy(() => delayLazy()(import("../pages/Confirm")));
export const Category = lazy(() => delayLazy()(import("../pages/Category")));
export const Profile = lazy(() => delayLazy()(import("../pages/Profile")));
export const CreateProduct = lazy(() =>
  delayLazy()(import("../pages/CreateProduct"))
);
export const ManagementProducts = lazy(() =>
  delayLazy()(import("../pages/ManagementProducts"))
);
export const ManagementUser = lazy(() =>
  delayLazy()(import("../pages/ManagementUser"))
);
export const ManagementOrder = lazy(() =>
  delayLazy()(import("../pages/ManagementOrder"))
);
export const ManagementCategory = lazy(() =>
  delayLazy()(import("../pages/ManagementCategory"))
);
export const OrderHistory = lazy(() =>
  delayLazy()(import("../pages/OrderHistory"))
);
export const CreateCategory = lazy(() =>
  delayLazy()(import("../pages/CreateCategory"))
);
export const Dashboard = lazy(() => delayLazy()(import("../pages/Dashboard")));
export const EditOrder = lazy(() => delayLazy()(import("../pages/EditOrder")));
