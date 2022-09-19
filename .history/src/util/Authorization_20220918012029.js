import axios from "axios";
import Globe from "./Globe";
import notification from "./Notification";
if (!Globe.userId) {
  notification
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
