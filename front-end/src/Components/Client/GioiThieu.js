import React, { useEffect, useState } from 'react';
import { GetGioiThieuALL } from '../../services/gioithieuService';
const GioiThieu = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getGT();
    }, [])
    const getGT = async () => {
        try {
            const res = await GetGioiThieuALL();
            const data = res && res.data ? res.data : res
            console.log(data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>

            <br />
            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">Thông tin giới thiệu về cửa hàng </h1>
                        </div>
                        <div className="document__content typography">
                            {data.map((item, index) => (
                                <p key={index}>{item.NoiDung}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GioiThieu;
