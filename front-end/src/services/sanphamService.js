import axios from "../utils/axiosCustomize";
const GetSanPham_asc = async () => {
    return axios.get("sanpham/get-asc/8");
}
const GetSanPhamNgauNhien = async () => {
    return axios.get("sanpham/get-random/8")
}
const GetByID = async (id) => {
    return axios.get(`sanpham/get-by-id/${id}`)
}
const getDanhMuc = async (id) => {
    return axios.get(`sanpham/get-by-loai/${id}`)
}
const timKiem = async (obj) => {
    return axios.post("sanpham/search", obj)
}
export { GetSanPham_asc, GetSanPhamNgauNhien, GetByID, getDanhMuc, timKiem }