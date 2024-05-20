import axios from "../utils/axiosCustomize";
const GetLoaiSanPhamALL = async () => {
    return axios.get("danhmuc/get-asc");
}
export { GetLoaiSanPhamALL }
