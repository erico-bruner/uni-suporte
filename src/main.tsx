import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import ResetStyle from "./styles/ResetStyle.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
