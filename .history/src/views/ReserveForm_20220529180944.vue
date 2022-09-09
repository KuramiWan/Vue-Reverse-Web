<template>
  <!-- <div>asdlfkjk</div> -->
  <md-field>
    <label>value</label>
    <md-input v-model="tag"></md-input>
  </md-field>
</template>
<script>
export default {
  name: "reserveForm",
  data() {
    return {
      value: "init Value",
      tag: null
    };
  }
};
</script>

<style></style>
