import axios from "../utils/axiosCustomize";
const CreateHoaDon = async (obj) => {
    return axios.post("donhang/create", obj);
}
const getByDonHang = async (id) => {
    return axios.get(`donhang/get-by-don-hang/${id}`)
}
const getDonHangByNguoiDung = async (id) => {
    return axios.get(`donhang/get-by-nguoi-dung/${id}`)
}

export { CreateHoaDon, getDonHangByNguoiDung, getByDonHang }