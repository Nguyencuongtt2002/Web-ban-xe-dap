import React, { useEffect, useState } from 'react';
import { getALL } from '../../services/slideService';
import ModalAddNew from './ModalAddNew';
import { FcPlus } from "react-icons/fc";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import TableSlide from './TableSlide';
const Slide = () => {
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});


    useEffect(() => {
        getAllSlide();
    }, [])

    const getAllSlide = async () => {
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
                        <TableSlide
                            data={data}
                            hanleClickUpdate={hanleClickUpdate}
                            hanleClickDelete={hanleClickDelete}
                        />

                        <ModalAddNew
                            getAllSlide={getAllSlide}
                            setShow={setShowModalAddNew}
                            show={showModalAddNew}
                        />
                        <ModalUpdate
                            getAllSlide={getAllSlide}
                            setShow={setShowModalUpdate}
                            show={showModalUpdate}
                            dataEdit={dataEdit}
                            setDataEdit={setDataEdit}
                        />
                        <ModalDelete
                            show={showModalDelete}
                            setShow={setShowModalDelete}
                            dataDelete={dataDelete}
                            getAllSlide={getAllSlide}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slide;