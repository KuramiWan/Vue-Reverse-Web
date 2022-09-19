<template>
  <div></div>
</template>

<script>
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
if (!this.GLOB.userId) {
  axios
    .post("/user/info")
    .then(response => {
      var data = response.data.data;
      Globe.userId = data.userId;
      Globe.permissions = data.permissions;
      Globe.userName = data.userName;
    })
    .catch(error => {
      console.log(error);
    });
}
</script>

<style></style>
