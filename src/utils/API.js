import axios from "axios";


const BASEURL = "https://randomuser.me/api/?results=50";
// eslint-disable-next-line import/no-anonymous-default-export
const API = {

  getUsers: function() {
    return axios.get(BASEURL);
  }
};

export default API;