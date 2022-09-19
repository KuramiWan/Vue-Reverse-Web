<template>
  <div></div>
</template>

<script>
import axios from "axios";

async function globe() {

  if (!userId) {
    axios
      .post("/user/info")
      .then(response => {
        var data = response.data.data;
         var userId = data.userId;
        var permissions = data.permissions;
        var userName = data.userName;
        if (permissions > 1) {
         var adminShow = true;
        }
        console.log(userId, permissions, userName, adminShow);
        return {userId,permissions,userName,adminShow}
      })
      .catch(error => {
        console.log(error);
      });
  }
  return { userName, userId, permissions, adminShow };
}
console.log(globe);
export default {
  globe
};
</script>

<style></style>
