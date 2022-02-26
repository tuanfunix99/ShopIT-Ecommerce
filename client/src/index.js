import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "rc-slider/assets/index.css";

const stripePromise = loadStripe(
  "pk_test_51JK1QAEHG8aSAywSBtwDdsvWMFX15pxZN42Wv4rNtZTyDxbtMTSSv39c3SEW31n2worb4v9Ec1eop5MVaprqBm6700S3Iv16zT"
);

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <Router>
        <App />
      </Router>
    </Elements>
  </Provider>,
  document.getElementById("root")
);
