<template>
  <md-field>
    <label>Initial Value</label>
    <md-input v-model="initial"></md-input>
  </md-field>
</template>

<script>
export default {
  bodyClass: "reserve_form_page",
  data: () => ({
    initial: "Initial Value"
  })
};
</script>

<style></style>
