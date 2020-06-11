<template>
  <section>
    <Header />
    <div class="main">
      <h3>Covid19KE Geofence</h3>
      <GmapMap
        :center="center"
        :zoom="zoom"
        map-type-id="terrain"
        style="width: 325px; height: 400px"
        ref="mapRef"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
        <GmapPolygon :paths="polygon" />
      </GmapMap>
      <h4>Location Alerts</h4>
      <div class="alert" v-if="showAlert">
        <p>You have left the affected area</p>
      </div>

      <div class="location alert" v-if="showLocationUpdate">
        <p>{{ message }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "@/components/Header";
import { gmapApi } from "vue2-google-maps";
export default {
  name: "Admin",
  components: {
    Header
  },
  data() {
    return {
      message: "",
      theRanchPolygon: {},
      showAlert: false,
      showLocationUpdate: false,
      zoom: 16,
      center: {
        lat: 1.3013,
        lng: 36.8071
      },
      polygon: [
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 },
        { lat: 1.3013, lng: 36.8071 }
      ]
    };
  },
  sockets: {
    connect() {},
    ping(position) {
      console.log(position);
      this.center = {
        ...position
      };
      const latLng = new this.google.maps.LatLng(position);
      this.showLocationUpdate = true;
      this.message = "Your location has changed";
      if (
        !this.google.maps.geometry.poly.containsLocation(
          latLng,
          this.theRanchPolygon
        )
      ) {
        this.showAlert = true;
      } else {
        this.message = "You have entered a covid19 prevalent area";
      }
    }
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(() => {
      this.theRanchPolygon = new this.google.maps.Polygon({
        paths: this.polygon
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  h3 {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  .alert {
    background: #f14343;
    color: white;
    padding: 15px;
    border-radius: 5px;
    p {
      margin: 0;
    }
  }
  .location {
    background: green;
    margin-top: 20px;
  }
}
</style>
