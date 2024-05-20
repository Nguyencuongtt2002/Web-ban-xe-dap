import React, { useEffect, useState } from 'react';
import { GetByID } from '../../services/sanphamService';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
const XemChiTiet = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        getTheoMa();
    }, []);
    const getTheoMa = async () => {
        if (id) {
            let res = await GetByID(Number(id)); // Convert id to number
            console.log(res)
            setProduct(res && res.data ? res.data : res);
        } else {
            console.error('ID is undefined');
        }
    }
    const dispatch = useDispatch();
    const Themvaogio = () => {
        if (product) {
            const sanpham = {
                MaSanPham: product[0]?.ID,
                TenSP: product[0]?.Ten,
                AnhDaiDien: product[0]?.Anh,
                SoLuong: quantity,
                DonGia: product[0]?.Gia,
            };
            dispatch(addToCart(sanpham));
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
            console.error('Product is undefined');
        }
    };
    return (
        <>
            <br />
            <div className="block">
                <div className="container">
                    <div className="product product--layout--standard" >
                        <div className="product__content">
                            <div className="product__gallery">
                                <div className="product-gallery">
                                    <div className="product-gallery__featured">
                                        <img
                                            className="d-block w-100"
                                            src={`data:image/jpg;base64,${product[0]?.Anh}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="product__info">
                                <div className="product__wishlist-compare"><button type="button"
                                    className="btn btn-sm btn-light btn-svg-icon" data-toggle="tooltip"
                                    data-placement="right" title="Wishlist"><svg width="16px" height="16px">
                                        <use xlinkHref="images/sprite.svg#wishlist-16"></use>
                                    </svg></button> <button type="button" className="btn btn-sm btn-light btn-svg-icon"
                                        data-toggle="tooltip" data-placement="right" title="Compare"><svg width="16px"
                                            height="16px">
                                            <use xlinkHref="images/sprite.svg#compare-16"></use>
                                        </svg></button></div>
                                <h1 className="product__name">{product[0]?.Ten}</h1>
                                <div className="product__rating">
                                    <div className="product__rating-stars">
                                        <div className="rating">
                                            <div className="rating__body"><svg className="rating__star rating__star--active"
                                                width="13px" height="12px">
                                                <g className="rating__fill">
                                                    <use xlinkHref="/assets/images/sprite.svg#star-normal"></use>
                                                </g>
                                                <g className="rating__stroke">
                                                    <use xlinkHref="/assets/images/sprite.svg#star-normal-stroke"></use>
                                                </g>
                                            </svg>
                                                <div className="rating__star rating__star--only-edge rating__star--active">
                                                    <div className="rating__fill">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                    <div className="rating__stroke">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                </div><svg className="rating__star rating__star--active" width="13px"
                                                    height="12px">
                                                    <g className="rating__fill">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal"></use>
                                                    </g>
                                                    <g className="rating__stroke">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal-stroke"></use>
                                                    </g>
                                                </svg>
                                                <div className="rating__star rating__star--only-edge rating__star--active">
                                                    <div className="rating__fill">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                    <div className="rating__stroke">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                </div><svg className="rating__star rating__star--active" width="13px"
                                                    height="12px">
                                                    <g className="rating__fill">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal"></use>
                                                    </g>
                                                    <g className="rating__stroke">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal-stroke"></use>
                                                    </g>
                                                </svg>
                                                <div className="rating__star rating__star--only-edge rating__star--active">
                                                    <div className="rating__fill">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                    <div className="rating__stroke">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                </div><svg className="rating__star rating__star--active" width="13px"
                                                    height="12px">
                                                    <g className="rating__fill">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal"></use>
                                                    </g>
                                                    <g className="rating__stroke">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal-stroke"></use>
                                                    </g>
                                                </svg>
                                                <div className="rating__star rating__star--only-edge rating__star--active">
                                                    <div className="rating__fill">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                    <div className="rating__stroke">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                </div><svg className="rating__star rating__star--active" width="13px"
                                                    height="12px">
                                                    <g className="rating__fill">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal"></use>
                                                    </g>
                                                    <g className="rating__stroke">
                                                        <use xlinkHref="/assets/images/sprite.svg#star-normal-stroke"></use>
                                                    </g>
                                                </svg>
                                                <div className="rating__star rating__star--only-edge rating__star--active">
                                                    <div className="rating__fill">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                    <div className="rating__stroke">
                                                        <div className="fake-svg-icon"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product__rating-legend"><a >7 Reviews</a><span>/</span><Link
                                    >Write A Review</Link></div>
                                </div>
                                <div className="product__description">{product[0]?.MoTa.length > 400 ? `${product[0]?.MoTa.substring(0, 400)}...` : product[0]?.MoTa}</div>

                                <ul className="product__meta">
                                    <li className="product__meta-availability">Chức năng: <span className="text-success">{product[0]?.ChucNang}</span></li>
                                    <li>Đường kính bánh xe: <a href="#">{product[0]?.DuongKinh}</a></li>
                                    <li>Mã sản phẩm: {product[0]?.ID}</li>
                                </ul>
                            </div>
                            <div className="product__sidebar">
                                <div className="product__prices">{product[0]?.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                <form className="product__options">
                                    <div className="form-group product__option"><label className="product__option-label"
                                        htmlFor="product-quantity">Quantity</label>
                                        <div className="product__actions">
                                            <div className="product__actions-item">
                                                <div className="input-number product__quantity">
                                                    <input id="product-quantity"
                                                        className="input-number__input form-control form-control-lg"
                                                        type="number" value={quantity}
                                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                        min="1" />
                                                </div>
                                            </div>
                                            <div className="product__actions-item product__actions-item--addtocart">

                                                <button onClick={(e) => { e.preventDefault(); Themvaogio(); }} className="btn btn-primary btn-lg">Add to cart
                                                </button>
                                            </div>
                                            <div className="product__actions-item product__actions-item--wishlist"><button
                                                type="button" className="btn btn-secondary btn-svg-icon btn-lg"
                                                data-toggle="tooltip" title="Wishlist"><svg width="16px"
                                                    height="16px">
                                                    <use xlinkHref="/assets/images/sprite.svg#wishlist-16"></use>
                                                </svg></button></div>
                                            <div className="product__actions-item product__actions-item--compare"><button
                                                type="button" className="btn btn-secondary btn-svg-icon btn-lg"
                                                data-toggle="tooltip" title="Compare"><svg width="16px"
                                                    height="16px">
                                                    <use xlinkHref="/assets/images/sprite.svg#compare-16"></use>
                                                </svg></button></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="product-tabs">
                        <div className="product-tabs__list" style={{ float: 'left' }}>
                            <a className="product-tabs__item ">Description</a>
                        </div>
                        <div className="product-tabs__content">
                            <div className="product-tabs__pane product-tabs__pane--active" id="tab-description">
                                <div className="typography">
                                    <h3>Product Full Description</h3>
                                    <p>{product[0]?.MoTa}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default XemChiTiet;
