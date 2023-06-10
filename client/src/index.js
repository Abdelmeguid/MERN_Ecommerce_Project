import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
// according CGPT reportWebVitals is a function provided by the React framework to measure and report performance metrics of your web application. It is typically used to capture and analyze key metrics related to user experience, such as page load time, interactivity, and layout shifts
// We can use it as below because our APP is parameter to this fiunction and performance appear as a Result i understand this .
// import { reportWebVitals } from './reportWebVitals';

// reportWebVitals(metric => {
//   // Send the metric to an analytics service
//   console.log(metric);
// });
