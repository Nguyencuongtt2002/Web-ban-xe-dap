import React, { useEffect, useState } from 'react';
import { getALL } from '../../services/sanphamService';
import { FcPlus } from "react-icons/fc";
import TableSanPham from './TableSanPham';
import ModalAddNew from './ModalAddNew';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';
const SanPham = () => {

    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        getAllSanPham();
    }, [])

    const getAllSanPham = async () => {
        try {
            const res = await getALL();
            const data = res && res.data ? res.data : res
            console.log(data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const hanleClickUpdate = (item) => {
        console.log(item)
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
                        <TableSanPham
                            data={data}
                            hanleClickUpdate={hanleClickUpdate}
                            hanleClickDelete={hanleClickDelete}
                        />
                        <ModalAddNew
                            getAllSanPham={getAllSanPham}
                            setShow={setShowModalAddNew}
                            show={showModalAddNew}
                        />
                        <ModalUpdate
                            getAllSanPham={getAllSanPham}
                            setShow={setShowModalUpdate}
                            show={showModalUpdate}
                            dataEdit={dataEdit}
                            setDataEdit={setDataEdit}
                        />
                        <ModalDelete
                            show={showModalDelete}
                            setShow={setShowModalDelete}
                            dataDelete={dataDelete}
                            getAllSanPham={getAllSanPham}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SanPham;