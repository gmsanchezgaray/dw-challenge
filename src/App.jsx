// * Core
import { DataProvider } from "./context/DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// * Components
import Header from "./components/Header";
import ListContainer from "./components/ListContainer";
import Toast from "./components/Toast";
// *Style
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />
        <Toast />
        <Routes>
          <Route path="/" element={<ListContainer />}></Route>
          <Route path="/cart" element={<ListContainer />}></Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
