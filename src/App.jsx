import { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import io from "socket.io-client";
import ReactGA from "react-ga";
import { ANALYTICS_ID } from "./constants";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ServiceProviderReg from "./Pages/ServiceProviderReg";
import ServiceProviderBenefits from "./Components/ServiceProviderBenefits";
import AdRegistration from "./Pages/AdRegistration";
import Developers from "./Components/Developers";
import TopService from "./Components/TopService";

ReactGA.initialize(ANALYTICS_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const socket = io("http://localhost:4000");

function App() {
  const getId = () => {
    const id = localStorage.getItem("id");
    if (id) {
      return id;
    } else {
      const newId = Date.now().toString();
      localStorage.setItem("id", newId);
      return newId;
    }
  };

  useEffect(() => {
    socket.emit("setup", { msg: "data from frontend App", id: getId() });

    socket.on("connection", () => {
      console.log("Connected to socket");
    });

    socket.on("msg", (data) => {
      console.log(data);
    });

    socket.on("test", (data) => {
      console.log(data, "< test socket from server");
    });

    socket.on("have-something-to-say", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-us" element={<ServiceProviderBenefits />} />
          <Route
            path="/service-provider-registration"
            element={<ServiceProviderReg />}
          />
          <Route path="/ad-reg" element={<AdRegistration />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/top-service" element={<TopService />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
