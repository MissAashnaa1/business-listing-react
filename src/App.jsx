import { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import io from "socket.io-client";
import ReactGA from "react-ga";
import { ANALYTICS_ID } from "./constants";

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
      <Home />
    </>
  );
}

export default App;
