import React, { useState } from 'react';
const TableDonHang = (props) => {
    const { data, handleXemChiTiet, hanldeDuyetDon } = props


    return (
        <>
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Ngày Đặt</th>
                        <th>Họ tên</th>
                        <th>Địa Chỉ</th>
                        <th>SĐT</th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data?.length > 0 &&
                        data?.map((item, index) => (
                            <tr>
                                <td>{item.ID}</td>
                                <td>{new Date(item.NgayDat).toLocaleDateString()}</td>
                                <td>{item.HoTen}</td>
                                <td>{item.NoiGiao}</td>
                                <td>{item.SDT}</td>
                                <td>
                                    {item.TrangThai === 0 ? 'Chờ xử lý' : 'Đã duyệt'}
                                </td>
                                <td>
                                    <button
                                        onClick={() => hanldeDuyetDon(item)}
                                        type="button"
                                        className="btn btn-primary mx-1 btn-xs"
                                        disabled={item.TrangThai === 1 ? true : false}
                                    >
                                        Duyệt đơn
                                    </button>
                                    <button
                                        onClick={() => handleXemChiTiet(item)}
                                        type="button"
                                        className="btn btn-secondary mx-1 btn-xs"
                                    >

                                        <i className="fas fa-info-circle">Xem chi tiết</i>
                                    </button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableDonHang;