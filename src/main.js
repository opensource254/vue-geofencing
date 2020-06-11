import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VSocket from "vue-socket.io";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDBS6ORL_N5Q-EHwmS5c4kEeiQPTCm_xsE",
    libraries: "geometry" // This is required if you use the Autocomplete
  }
});

Vue.use(
  new VSocket({
    debug: true,
    connection: "https://geo-server1.herokuapp.com/"
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
