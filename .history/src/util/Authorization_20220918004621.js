import axios from "axios";

axios.post("/user/info").then(
  response =>{
    var data = response.data.data
    this.Globe.userId = data.userId
    this.Globe.permi
  }
)