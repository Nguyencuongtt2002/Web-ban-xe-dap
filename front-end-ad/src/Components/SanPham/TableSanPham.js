import React from 'react';
import { Image } from 'react-bootstrap';
const TableSanPham = (props) => {
    const { data, hanleClickUpdate, hanleClickDelete } = props
    return (
        <>
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Tên SP</th>
                        <th>Ảnh</th>
                        <th>Đường kính</th>
                        <th>Số lượng</th>
                        <th>Mô tả</th>
                        <th>Tên danh mục</th>
                        <th>Màu</th>
                        <th>Nơi sản xuất</th>
                        <th colSpan={2}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data?.length > 0 &&
                        data?.map((item, index) => (
                            <tr>
                                <td>{item.ID}</td>
                                <td style={{ width: "18%" }}>{item.Ten}</td>
                                <td style={{ width: "30px" }}> <Image src={`data:image/jpg;base64,${item.Anh}`} style={{ height: '70px', width: '70px', objectFit: 'cover' }} alt={item.name} /></td>
                                <td style={{ width: "18%" }}>{item.DuongKinh}</td>
                                <td style={{ width: "12%" }}>{item.SoLuong}</td>
                                <td style={{ width: "55%" }}>{item.MoTa}</td>
                                <td style={{ width: "10%" }}> {item.TenDanhMuc}</td>
                                <td style={{ width: "15px" }}> {item.Mau}</td>
                                <td style={{ width: "15px" }}>{item.NoiSanXuat}</td>
                                <td className="w-100" colSpan={2}>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-primary mx-1 btn-xs"
                                            onClick={() => hanleClickUpdate(item)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger mx-1 btn-xs"
                                            onClick={() => hanleClickDelete(item)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table >
        </>
    )
}

export default TableSanPham;