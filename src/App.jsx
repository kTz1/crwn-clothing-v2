import { Routes, Route } from "react-router";

import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";

const Shop = () => {
  return <h1>Shop page</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
