import axios from "../utils/axiosCustomize";
const getALL = async () => {
    return axios.get("slide/get-desc")
}
const CreateSlide = async (obj) => {
    return axios.post("slide/create", obj);
}
const UpdateSlide = async (obj) => {
    return axios.put("slide/update", obj)
}
const DeleteSlide = async (id) => {
    return axios.delete(`slide/delete/${id}`)
}
export { CreateSlide, getALL, UpdateSlide, DeleteSlide }