// libs
import { lazy } from "react";
// others
import { delayLazy } from "../utils";

export const Home = lazy(() => delayLazy()(import("../pages/Home")));
export const Products = lazy(() => delayLazy()(import("../pages/Products")));
export const Product = lazy(() => delayLazy()(import("../pages/Product")));
