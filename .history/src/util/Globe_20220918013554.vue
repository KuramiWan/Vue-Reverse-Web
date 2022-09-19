<template>
  <div></div>
</template>

<script>
import axios from "axios";
var userName = "";
var userId = 0;
var permissions = "";
var adminShow = false;
export default {
  userName,
  userId,
  permissions,
  adminShow
};
if (!userId) {
  axios
    .post("/user/info")
    .then(response => {
      var data = response.data.data;
      userId = data.userId;
      permissions = data.permissions;
      userName = data.userName;
    })
    .catch(error => {
      console.log(error);
    });
}
</script>

<style></style>
