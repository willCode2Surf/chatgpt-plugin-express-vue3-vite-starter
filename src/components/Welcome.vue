<template>
  <q-page padding>
    <div class="cool-title waviy">
       <span style="--i:1">W</span>
       <span style="--i:2">E</span>
       <span style="--i:3">L</span>
       <span style="--i:4">C</span>
       <span style="--i:5">O</span>
       <span style="--i:6">M</span>
       <span style="--i:7">E</span>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useDeviceDetails } from "../composables/useStatusDetails";

export default {
  name: "Welcome",
  components: {},
  setup() {
   
    const { status } = useDeviceDetails();
    const now = ref(new Date(Date.now()));
    
    setInterval(() => {
      now.value = new Date(Date.now());
    }, 100);

    return {
      now,
      status
    };
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
</style>
