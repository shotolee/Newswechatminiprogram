//引用时间处理
var util = require('../../utils/util.js');

Page({
  data: {
    forecast: [{name: '国内', type: 'gn'}, {name: '国际', type: 'gj'}, {name: '财经', type: 'cj'}, {name: '娱乐', type: 'yl'}, {name: '军事', type:'js'}, {name: '体育', type: 'ty'}, {name: '其他', type: 'other'}] ,
    type: 'gn',
    news: [],
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
        type: this.data.type,
      },
        success:res => {
        let result = res.data.result
        //定义下部列表数组
        let news = []
        //利用循环读取新闻内容
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].firstImage != undefined) {
            news.push({
              id: result[i].id,
              title: result[i].title,
              time: util.formatTime(result[i].date),
              source: result[i].source,
              firstImage: result[i].firstImage
            })
          } else {
              news.push({
                id: result[i].id,
                title: result[i].title,
                time: util.formatTime(result[i].date),
                source: result[i].source,
                firstImage: '/images/default.gif'
              })
           }
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

  onTapType(event){
     this.setData({
       type: event.currentTarget.id
     })
    this.getNews()

  },
  onTapNews(event) {
    wx.navigateTo({
      url: '/pages/news/news?id=' + event.currentTarget.id,
    })
  }
})