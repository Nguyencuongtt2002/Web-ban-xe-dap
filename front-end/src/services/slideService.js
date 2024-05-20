import axios from "../utils/axiosCustomize";
const GetSlide_Asc = async () => {
    return axios.get("slide/get-asc");
}
export { GetSlide_Asc }