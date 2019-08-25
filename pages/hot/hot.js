// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerranklist: null,
    cached: false
  },

  // 获取歌手榜的方法
  getSingerRankList: function () {
    if (wx.getStorageSync('singerranklist')) {
      wx.getStorage({
        key: 'singerranklist',
        success: (res) => {
          console.log("singerranklist ==>", res.data);
          this.setData({
            singerranklist: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/artist/top?page=0&pageSize=20',
        method: 'GET',
        success: (res) => {
          console.log("singerranklist ==>", res.data);
          this.setData({
            singerranklist: res.data
          })
          // 数据存到本地
          wx.setStorage({
            key: "singerranklist",
            data: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 跳转到主页
  navToHome: function () {
    wx.redirectTo({
      url: '/pages/home/index'
    })
  },

  // 跳转到搜索页面
  navToSearch: function () {
    wx.redirectTo({
      url: '/pages/search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取
    if (!this.data.cached) {
      this.getSingerRankList();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.reLaunch({
      url: './hot',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})