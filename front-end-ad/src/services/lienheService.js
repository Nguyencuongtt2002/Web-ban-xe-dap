import axios from "../utils/axiosCustomize";
const getALL = async () => {
    return axios.get("lienhe/get-desc")
}
const CreateLienHe = async (obj) => {
    return axios.post("lienhe/create", obj);
}
const UpdateLienHe = async (obj) => {
    return axios.put("lienhe/update", obj)
}
const DeleteLienHe = async (id) => {
    return axios.delete(`lienhe/delete/${id}`)
}
export { CreateLienHe, getALL, UpdateLienHe, DeleteLienHe }