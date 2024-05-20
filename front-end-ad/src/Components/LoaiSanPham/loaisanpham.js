import React, { useEffect, useState } from 'react';
import TableLoaiSanPham from './TableLoaiSanPham';
import { getALL } from '../../services/loaisanphamService';
import ModalAddNew from './ModalAddNew';
import { FcPlus } from "react-icons/fc";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
const LoaiSanPham = () => {
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});


    useEffect(() => {
        getAllLoaisp();
    }, [])

    const getAllLoaisp = async () => {
        try {
            const res = await getALL();
            const data = res && res.data ? res.data : res
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const hanleClickUpdate = (item) => {
        setShowModalUpdate(true);
        setDataEdit(item);
    };

    const hanleClickDelete = (item) => {
        setShowModalDelete(true);
        setDataDelete(item);
    };
    return (
        <>
            <p className="text-muted font-13 m-b-30">
                <button className="btn btn-primary" onClick={() => setShowModalAddNew(true)}><FcPlus /> Tạo mới</button>
            </p>
            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <TableLoaiSanPham
                            data={data}
                            hanleClickUpdate={hanleClickUpdate}
                            hanleClickDelete={hanleClickDelete}
                        />
                        <ModalAddNew
                            getAllLoaisp={getAllLoaisp}
                            setShow={setShowModalAddNew}
                            show={showModalAddNew}
                        />
                        <ModalUpdate
                            show={showModalUpdate}
                            setShow={setShowModalUpdate}
                            dataEdit={dataEdit}
                            setDataEdit={setDataEdit}
                            getAllLoaisp={getAllLoaisp}
                        />
                        <ModalDelete
                            show={showModalDelete}
                            setShow={setShowModalDelete}
                            dataDelete={dataDelete}
                            getAllLoaisp={getAllLoaisp}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoaiSanPham;