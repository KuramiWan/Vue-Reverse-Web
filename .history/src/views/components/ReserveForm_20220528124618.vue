<template>
  <md-field>
    <label>姓名</label>
    <md-input v-model="name"></md-input>
    <label for=""></label>
    <md-input v-model="type"></md-input>
  </md-field>
</template>

<script>
export default {
  data() {
    return {
      name,
      type
    };
  }
};
</script>

<style></style>
