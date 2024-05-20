import React from 'react';

const TableGioiThieu = (props) => {

    const { data, hanleClickUpdate, hanleClickDelete } = props
    return (
        <>
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>ID</th>
                        <th style={{ width: "60%" }}>Nội dung</th>
                        <th colSpan={2}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 &&
                        data.map((item, index) => (
                            <tr>
                                <td>{item.ID}</td>
                                <td>{item.NoiDung}</td>
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

export default TableGioiThieu;