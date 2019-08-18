//引用时间处理
var util = require('../../utils/util.js');

Page({
  data: {
    forecast: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'] ,
    news: [], //下部的新闻列表
    //id: '',
    firstnewsImage: '/images/default.gif' //默认图片
  },
  onPullDownRefresh(){
    this.getNews(()=>{
      wx.stopPullDownRefresh()
    })
  },
  onLoad() {
    this.getNews()
  },
  
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //接口调用
      data: {
        type: 'gn',
      },
        success:res => {
        let result = res.data.result
        //定义下部列表数组
        let news = []
        //利用循环读取新闻内容
        for (let i = 0; i < result.length; i += 1) {
            news.push({
              id: result[i].id,
              title: result[i].title,
              time: util.formatTime(result[i].date),
              source: result[i].source,
              firstImage: result[i].firstImage
            })
          }
      //更新页面数据
        this.setData({
          news: news
        })
      },
      //下拉刷新停止的回调定义
      complete: ()=>{
        callback && callback()
      }
    })
  },
  onTapNews(event) {
    wx.navigateTo({
      url: '/pages/news/news?id=' + event.currentTarget.id,
    })
  }
})