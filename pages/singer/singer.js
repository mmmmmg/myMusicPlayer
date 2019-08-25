// pages/singer/singer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerId: null,
    singerName: null,
    singerSong: null
  },

  // 获取歌手的歌曲的方法
  getSingerSong: function () {
    if (wx.getStorageSync('singerSong')) {
      wx.getStorage({
        key: 'singerSong',
        success: (res) => {
          console.log("singerSong ==>", res.data);
          this.setData({
            singerSong: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/song/artist?id=' + this.data.singerId,
        method: 'GET',
        success: (res) => {
          console.log("singerSong ==>", res.data);
          this.setData({
            singerSong: res.data
          })
          // 数据存到本地
          // wx.setStorage({
          //   key: "singerSong",
          //   data: res.data
          // })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      singerId: options.id,
      singerName: options.singername
    })
    this.getSingerSong();
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