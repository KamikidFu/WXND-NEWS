//Constant variables
const API = require("../../utils/apis.js");
const NEWS_TYPE= ["gn", "gj", "cj", "yl", "js", "ty", "other"];
const TAB_NAME=["国内", "国际", "财经", "娱乐", "技术", "体育", "其他"];

Page({
  data:{
    tab_names: TAB_NAME,
    isLoaded:false,
    newsList:[],
    hotNews:{},
    currentTabIndex: 0
  },
  /**
   * onLoad function is to get news data ready
   */
  onLoad: function(){
    wx.showLoading({
      title: '加载中...',
    });

    this.getNews(() => {
      wx.hideLoading();
    });
  },
  /**
   * Enable pull down refresh function
   */
  onPullDownRefresh(){
    this.getNews(()=>{
      wx.stopPullDownRefresh()
    });
  },
  /**
   * getNews function is to call API and retrieve data from API online
   */
  getNews(callback){
    API.getList(NEWS_TYPE[this.data.currentTabIndex]).then(res => {
      if(res.data.result.length > 0){
        this.setNewsData(res.data.result); 
        typeof callback === 'function' && callback();
      }else{
        this.setData({
          newsList: []
        })
        wx.showToast({
          title: '网络异常',
        });
      }
    });
  },
 /**
  * set news data to local variables
  */
  setNewsData(list){
    let news = list;
    let hotNews = {
      id: news[0].id,
      title: news[0].title,
      time: news[0].date.slice(11, 16),
      source: news[0].source,
      firstImage: news[0].firstImage
    };

    let newsList = [];
    for (var i = 1; i < news.length; i++) {
      newsList.push({
        id: news[i].id,
        title: news[i].title,
        time: news[i].date.slice(11, 16),
        source: news[i].source,
        firstImage: news[i].firstImage
      })
    }
    //console.log(newsList);
    this.setData({
      newsList: newsList,
      hotNews: hotNews
    });
  },
  /**
   * tap on category tab
   */
  onTapTab(event){
    let index = TAB_NAME.indexOf(event.target.dataset.hi);
    if (index !== this.data.currentTabIndex) {
      this.setData({
        currentTabIndex: index
      })
      this.getNews();
    }
    //console.log(this.data.currentTabIndex);
  },
  /**
   * tap on news to go to next page
   */
  onTapNews(event){
    let id = event.currentTarget.dataset.hi;
    //console.log(id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})