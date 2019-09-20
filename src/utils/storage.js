


const setStorage = (key, data) => {
    wx.setStorageSync(key, data)
}
const getStorage = (key) => {
    return wx.getStorageSync(key)
}
const removeStorage = (key) => {
    return wx.removeStorageSync(key);
}
export { setStorage, getStorage, removeStorage }
