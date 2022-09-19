import axios from "axios";
import Globe from "./Globe";
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
