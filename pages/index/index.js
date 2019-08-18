//引用时间处理
var util = require('../../utils/util.js');

Page({
  data: {
    forecast: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'] ,
    news: [], //下部的新闻列表
    //热点新闻
    firstnewsTitle: '',
    firstnewsSource: '',
    firstnewsTime: '',
    id: '',
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
        //定义热门新闻第一条样式
        let firstnewsTitle
        let firstnewsSource
        let firstnewsTime
        let id
        let firstnewsImage
        //利用循环读取新闻内容
        for (let i = 0; i < result.length; i += 1) {
          // 第一条新闻内容给热门
          if (i == 0) {
            id = result[0].id,
            firstnewsTitle = result[0].title,
            firstnewsSource = result[0].source,
            firstnewsTime = util.formatTime(result[0].date),
            firstnewsImage = result[0].firstImage
          }  else {
            news.push({
              id: result[i].id,
              title: result[i].title,
              time: util.formatTime(result[i].date),
              source: result[i].source,
              firstImage: result[i].firstImage
            })
          }
        }
        console.log(result)
      //更新页面数据
        this.setData({
          //第一条热门新闻
          firstnewsTitle: firstnewsTitle,
          firstnewsSource: firstnewsSource,
          firstnewsTime: firstnewsTime,
          id: id,
          firstnewsImage: firstnewsImage,
          //下部列表，第 2 条至最结束
          news: news
        })
      },
      //下拉刷新停止的回调定义
      complete: ()=>{
        callback && callback()
      }
    })
  },
  onTapNews() {
    wx.navigateTo({
      url: '/pages/news/news?id=' + this.data.id,
    })
  }
})