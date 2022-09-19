<template>
  <div></div>
</template>

<script>
userName = "";
userId = 0;
permissions = "";
adminShow = false;
export default {
  userName,
  userId,
  permissions,
  adminShow
};
if (!Globe.userId) {
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
