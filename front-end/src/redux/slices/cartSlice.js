import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItemIndex = state.items.findIndex(existingItem => existingItem.MaSanPham === item.MaSanPham);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].SoLuong += item.SoLuong;
            } else {
                state.items = [...state.items, item];
            }
            // Cập nhật tổng số lượng và tổng giá trị sau khi thêm vào giỏ hàng
            state.totalQuantity += item.SoLuong;
            state.totalPrice += item.SoLuong * item.DonGia;
        },
        xoa1sp: (state, action) => {
            const MaSanPham = action.payload;
            const itemToRemove = state.items.find(item => item.MaSanPham === MaSanPham);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.SoLuong;
                state.totalPrice -= itemToRemove.SoLuong * itemToRemove.DonGia;
                state.items = state.items.filter(item => item.MaSanPham !== MaSanPham);
            }
        },
        tangSoLuong: (state, action) => {
            const MaSanPham = action.payload;
            const item = state.items.find(item => item.MaSanPham === MaSanPham);
            if (item) {
                item.SoLuong += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.DonGia;
            }
        },
        giamSoLuong: (state, action) => {
            const MaSanPham = action.payload;
            const itemIndex = state.items.findIndex(item => item.MaSanPham === MaSanPham);
            if (itemIndex !== -1 && state.items[itemIndex].SoLuong > 1) {
                state.items[itemIndex].SoLuong -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= state.items[itemIndex].DonGia;
            } else if (itemIndex !== -1 && state.items[itemIndex].SoLuong === 1) {
                state.totalQuantity -= 1;
                state.totalPrice -= state.items[itemIndex].DonGia;
                state.items.splice(itemIndex, 1);
            }
        },

        xoaAll: state => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, xoa1sp, tangSoLuong, giamSoLuong, xoaAll } = cartSlice.actions;
export default cartSlice.reducer;
