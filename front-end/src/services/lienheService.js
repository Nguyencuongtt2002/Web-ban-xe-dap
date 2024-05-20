import axios from "../utils/axiosCustomize";
const GetLienHeALL = async () => {
    return axios.get("lienhe/get-asc");
}
export { GetLienHeALL }
