import React, { useEffect, useState } from 'react';
import { GetLienHeALL } from '../../services/lienheService';
const LienHe = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getLienHe();
    }, [])

    const getLienHe = async () => {
        try {
            const res = await GetLienHeALL();
            const data = res && res.data ? res.data : res
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>
            <br />
            <div className="block-map block">
                <div className="block-map__body">
                    <iframe
                        src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
            </div>
            <div className="block">
                <div className="container">
                    <div className="card mb-0">
                        <div className="card-body contact-us">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                        <h4 className="contact-us__header card-title">Our Address</h4>
                                        <div className="contact-us__address">
                                            {data.map((item, index) => (
                                                <div key={index}>
                                                    <p>{item.NoiDung}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <h4 className="contact-us__header card-title">Leave us a Message</h4>
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">Your Name</label>
                                                    <input type="text" id="form-name" className="form-control" placeholder="Your Name" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">Email</label>
                                                    <input type="email" id="form-email" className="form-control" placeholder="Email Address" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-subject">Subject</label>
                                                <input type="text" id="form-subject" className="form-control" placeholder="Subject" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-message">Message</label>
                                                <textarea id="form-message" className="form-control" rows="4"></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Send Message</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LienHe;
