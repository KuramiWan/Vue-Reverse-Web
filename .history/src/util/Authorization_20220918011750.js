import axios from "axios";
console.log(this);
if (!this.Globe.userId) {
  axios
    .post("/user/info")
    .then(response => {
      var data = response.data.data;
      this.Globe.userId = data.userId;
      this.Globe.permissions = data.permissions;
      this.Globe.userName = data.userName;
    })
    .catch(error => {
      console.log(error);
    });
}
export default Authorization;
