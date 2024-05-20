import axios from "../utils/axiosCustomize";
const GetGioiThieuALL = async () => {
    return axios.get("gioithieu/get-asc");
}
export { GetGioiThieuALL }
