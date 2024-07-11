import React from "react";
import Dashboard from "./Components/Dashboard";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Dashboard />
      <Analytics />
    </>
  );
}

export default App;
