import React from 'react';

const TableLoaiSanPham = (props) => {

    const { data, hanleClickUpdate, hanleClickDelete } = props
    return (
        <>
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>ID</th>
                        <th style={{ width: "30%" }}>Tên</th>
                        <th style={{ width: "40%" }}>Mô tả </th>
                        <th colSpan={2}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 &&
                        data.map((item, index) => (
                            <tr>
                                <td>{item.ID}</td>
                                <td>{item.Ten}</td>
                                <td>{item.MoTa}</td>
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
            </table>
        </>
    )
}

export default TableLoaiSanPham;