// component/musiclist-card/musiclist-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listItems: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapLogin: function (e) {
      wx.navigateTo({
        url: '/pages/music/music?id=' + e.currentTarget.dataset.id + '&searchId=' + e.currentTarget.dataset.searchid,
      })
    }
  }
})
