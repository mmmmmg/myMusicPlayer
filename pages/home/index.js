// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rcmsonglist: null,
    newsonglist: null,
    cached: false
  },

  // 获取推荐歌单的方法
  getRcmSongList: function () {
    if (wx.getStorageSync('rcmsonglist')) {
      wx.getStorage({
        key: 'rcmsonglist',
        success: (res) => {
          console.log("rcmsonglist ==>",res.data);
          this.setData({
            rcmsonglist: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=6&page=0',
        method: 'GET',
        success: (res) => {
          console.log("rcmsonglist ==>",res.data);
          this.setData({
            rcmsonglist: res.data
          })
          // 数据存到本地
          wx.setStorage({
            key: "rcmsonglist",
            data: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 获取最新音乐的方法
  getNewSongList: function () {
    if (wx.getStorageSync('newsonglist')) {
      wx.getStorage({
        key: 'newsonglist',
        success: (res) => {
          console.log("newsonglist ==>",res.data);
          this.setData({
            newsonglist: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/song/newest',
        method: 'GET',
        success: (res) => {
          console.log("newsonglist ==>",res.data);
          this.setData({
            newsonglist: res.data
          })
          // 数据存到本地
          wx.setStorage({
            key: "newsonglist",
            data: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 跳转到热歌榜页面
  navToHot: function() {
    wx.redirectTo({
      url: '/pages/hot/hot'
    })
  },

  // 跳转到搜索页面
  navToSearch: function() {
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
      this.getRcmSongList();
      this.getNewSongList();
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
    wx.clearStorage();
    wx.reLaunch({
      url: './index',
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