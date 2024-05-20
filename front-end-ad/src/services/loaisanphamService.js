import axios from "../utils/axiosCustomize";
const getALL = async () => {
    return axios.get("danhmuc/get-desc")
}
const CreateLoaiSP = async (obj) => {
    return axios.post("danhmuc/create", obj);
}
const UpdateLoaiSanPham = async (obj) => {
    return axios.put("danhmuc/update", obj)
}
const DeleteLoaiSanPham = async (id) => {
    return axios.delete(`danhmuc/delete/${id}`)
}
export { CreateLoaiSP, getALL, UpdateLoaiSanPham, DeleteLoaiSanPham }