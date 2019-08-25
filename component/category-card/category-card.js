// component/category-card/category-card.js
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
        url: '/pages/songsheet/songsheet?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
