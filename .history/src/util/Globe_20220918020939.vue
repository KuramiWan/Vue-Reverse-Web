<template>
  <div></div>
</template>

<script>
import axios from "axios";
var userName = "";
var userId = 0;
var permissions = "";
var adminShow = false;
if (!userId) {
  axios
    .post("/user/info")
    .then(response => {
      var data = response.data.data;
      userId = data.userId;
      permissions = data.permissions;
      userName = data.userName;
      if (permissions > 1) {
        adminShow = true;
      }
      console.log(userId, permissions, userName, adminShow);
    })
    .catch(error => {
      console.log(error);
    });
}
export default {
  userName,
  userId,
  permissions,
  adminShow
};
</script>

<style></style>
