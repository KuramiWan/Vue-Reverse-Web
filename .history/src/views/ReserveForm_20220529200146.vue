<template>
  <div class="wrapper">
    <md-field>
      <label>value</label>
      <md-input v-model="initValue"></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initValue: null
    };
  }
};
</script>

<style></style>
