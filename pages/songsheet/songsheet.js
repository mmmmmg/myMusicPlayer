// pages/songsheet/songsheet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsheetid: null,
    songsheet: null,
    newsonglist: null,
    cached: false
  },

  // 获取歌单信息
  getSongSheet: function () {
    if (wx.getStorageSync('songsheet')) {
      wx.getStorage({
        key: 'songsheet',
        success: (res) => {
          console.log("songsheet ==>", res.data);
          this.setData({
            songsheet: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/songList?id=' + this.data.songsheetid,
        method: 'GET',
        success: (res) => {
          console.log("songsheet ==>", res.data);
          this.setData({
            songsheet: res.data
          })
          // 数据存到本地
          // wx.setStorage({
          //   key: "songsheet",
          //   data: res.data
          // })
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
          console.log("newsonglist ==>", res.data);
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
          console.log("newsonglist ==>", res.data);
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

  // 简介处展开逻辑
  changeOverflow: function (e) {
    if (this.data.dec === "description_0" && this.data.arrow === "../../images/closeup.png") {
      // 关闭
      this.setData({
        dec: "null",
        arrow: '../../images/opendown.png'
      })
    } else {
      // 展开
      this.setData({
        dec: "description_0",
        arrow: '../../images/closeup.png'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取路由参数
    this.setData({
      songsheetid: options.id,
      arrow: '../../images/opendown.png'
    })
    // 获取歌单
    if (!this.data.cached) {
      this.getSongSheet();
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