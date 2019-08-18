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
       // id: '1552623252481'
      },
      success: res => {
        let result = res.data.result
        let newstitle = result.title
        let newsdata = util.formatTime(result.date)
        let newssource = result.source
        let newsfirstImage = result.firstImage
        let newsreadCount = result.readCount
        let newsbody = []
//更新页面数据
//利用循环读取新闻段落内容
        for (let i = 0; i < result.content.length; i += 1) {
          newsbody.push({
            id: result.content[i].id,
            text: result.content[i].text,
            type: result.content[i].type,
            src: result.content[i].src
          })
        }
        this.setData({
          newstitle: newstitle,
          newsdata: newsdata,
          newssource: newssource,
          newsfirstImage: newsfirstImage,
          newsreadCount: newsreadCount,
          newsbody: newsbody
        })
        console.log(newsbody)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})