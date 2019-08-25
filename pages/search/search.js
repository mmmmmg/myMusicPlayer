// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInputValue: '',
    searchSuggest: [],
    searchKeyword: '',
    searchBooks: [],
    serchkeyword: '',
    contentKeyword: '',

    searchsonglist: null,

    onsearch: 'false'
  },

  // 搜索框获得焦点时触发
  onSearchInput: function(e) {
    this.setData({
      searchInputValue: e.detail.value,
      searchBooks: [],
      serchkeyword: e.detail.value,
      onsearch: 'true'
    })
    if (this.data.searchInputValue) {
      wx.request({
        url: 'https://v1.itooi.cn/netease/search?keyword=' + this.data.searchInputValue + '&type=song&pageSize=10&page=0',
        data: {
          query: this.data.searchInputValue
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log("searchresult ==>",res.data.data.songs)
          this.setData({
            searchSuggest: res.data.data.songs
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 搜索框失去焦点时触发
  closeSearch: function () {
    this.setData({
      onsearch: 'false'
    })
  },

  // 获取搜索内容
  getSearchContent: function (keyword) {
    if (wx.getStorageSync('searchsonglist')) {
      wx.getStorage({
        key: 'searchsonglist',
        success: (res) => {
          console.log("searchsonglist ==>", res.data);
          this.setData({
            searchsonglist: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/search?keyword=' + keyword + '&type=song&pageSize=20&page=0',
        method: 'GET',
        success: (res) => {
          console.log("searchsonglist ==>", res.data);
          this.setData({
            searchsonglist: res.data
          })
          // 数据存到本地
          // wx.setStorage({
          //   key: "searchsonglist",
          //   data: res.data
          // })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 开始搜索
  startSearch: function (e) {
    // console.log(e.target.dataset.keyword.name);
    this.setData({
      contentKeyword: e.target.dataset.keyword.name
    })
    this.getSearchContent(e.target.dataset.keyword.name);
  },

  // 跳转到主页
  navToHome: function () {
    wx.redirectTo({
      url: '/pages/home/index'
    })
  },

  // 跳转到热歌榜页面
  navToHot: function () {
    wx.redirectTo({
      url: '/pages/hot/hot'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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