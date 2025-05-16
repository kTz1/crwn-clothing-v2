import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/Spinner";

// Lazy load the components to improve performance
const Navigation = lazy(() => import("./routes/navigation/Navigation"));
const Checkout = lazy(() => import("./routes/checkout/Checkout"));
const Shop = lazy(() => import("./routes/shop/Shop"));
const Home = lazy(() => import("./routes/home/Home"));
const Authentication = lazy(() =>
  import("./routes/authentication/Authentication")
);

const App = () => {
  const dispatch = useDispatch();
  // listen for changes in auth
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]); // dispatch is not going to change

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
