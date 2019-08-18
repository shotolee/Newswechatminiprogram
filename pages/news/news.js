// pages/news/news.js
var util = require('../../utils/util.js');

Page({
  data: {
    newstitle: '',
    newsdata: '',
    newssource: '',
    newsfirstImage: '',
    newsreadCount: '',
    newsbody: []
  },
  onLoad(options) {
    
    this.setData({
      id: options.id
    })
    this.getNewsInfo()
  },
  onPullDownRefresh(){
    this.getNewsInfo(()=>{
      wx.stopPullDownRefresh()
    })
  },
  getNewsInfo(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail', 
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        let newstitle = result.title
        let newsdata = util.formatTime(result.date)
        let newssource = result.source
        let newsfirstImage = result.firstImage
        let newsreadCount = result.readCount

//更新页面数据
        this.setData({
          newstitle: newstitle,
          newsdata: newsdata,
          newssource: newssource,
          newsfirstImage: newsfirstImage,
          newsreadCount: newsreadCount
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})