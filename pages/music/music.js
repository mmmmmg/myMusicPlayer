// pages/music/music.js

const music = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songid: null,
    song: null,
    onplay: false,
    rotate: null,
    playlogo: true,

    onLrc: false,
    songLrc: null,
    lrcContent: null,
    lrcTime: null,

    cached: false
  },

  // 获取歌曲信息
  getSong: function () {
    if (wx.getStorageSync('song')) {
      wx.getStorage({
        key: 'song',
        success: (res) => {
          console.log("song ==>", res.data);
          this.setData({
            song: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/song?id=' + this.data.songid,
        method: 'GET',
        success: (res) => {
          console.log("song ==>", res.data);
          this.setData({
            song: res.data
          })
          // 数据存到本地
          // wx.setStorage({
          //   key: "song",
          //   data: res.data
          // })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 获取歌词
  getSongLrc: function () {
    if (wx.getStorageSync('songLrc')) {
      wx.getStorage({
        key: 'songLrc',
        success: (res) => {
          // console.log("songLrc ==>\n", res.data);
          this.setData({
            songLrc: res.data
          })
        }
      })
    } else {
      wx.request({
        url: 'https://v1.itooi.cn/netease/lrc?id=' + this.data.songid,
        method: 'GET',
        success: (res) => {
          // console.log("songLrc ==>\n", res.data);
          this.setData({
            songLrc: res.data
          })
          // 数据存到本地
          // wx.setStorage({
          //   key: "songLrc",
          //   data: res.data
          // })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // 截取歌词文稿
  delLrc: function () {
    // 歌词
    var lrc = this.data.songLrc;

    // 截取歌词时间
    var time = lrc.match(/\d{2}:\d{2}.\d{2,3}/g);
    this.setData({
      lrcTime: time
    })

    // 截取歌词内容
    var content = lrc.split(/\[\d{2}:\d{2}.\d{2,3}\]/g);
    this.setData({
      lrcContent: content
    })
  },

  // 展开歌词
  openLrc: function() {
    this.delLrc();
    this.setData({
      onLrc: true,
      onScroll: 'openscroll'
    })
  },

  // 控制播放&停止
  audioPlay: function (options) {
    if (!this.data.onplay) {
      // 播放
      music.play();
      this.setData({
        onplay: true,
        playlogo: false,
        rotate: 'onmusic'
      })
    } else {
      // 停止
      music.pause();
      this.setData({
        onplay: false,
        playlogo: true,
        rotate: null
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取路由参数
    if (options.id != 'undefined') {
      this.setData({
        songid: options.id
      })
    } else {
      this.setData({
        songid: options.searchId
      })
    }
    
    // 获取
    if (!this.data.cached) {
      // 歌曲信息
      this.getSong();
      // 歌词
      this.getSongLrc();
    }

    // 播放结束时触发
    music.onEnded(() => {
      this.setData({
        onplay: false,
        playlogo: true,
        rotate: null
      })
    })
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
    music.src = 'https://v1.itooi.cn/netease/url?id=' + this.data.songid + '&quality=flac';
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
    music.stop();
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