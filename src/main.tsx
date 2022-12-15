import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Susheng } from "./namespace-test";

const {DataFields, SamplingPolicy} = Susheng;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { AllowedFeatureFlags } from "./App";

console.log(AllowedFeatureFlags);
