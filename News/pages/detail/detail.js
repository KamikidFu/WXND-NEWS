//Constant variables
const API = require("../../utils/apis.js");

Page({
  data:{
    id:'',
    title:'',
    time:'',
    source:'',
    content:[],
    count:''
  },
  /**
   * Similar logic with index.js
   */
  onLoad: function (options){
    this.setData({
      id: options.id
    });
    wx.showLoading({
      title: '加载中...',
    });

    this.getNewsDetail(() => {
      wx.hideLoading();
    });
  },
  /**
   * get news detail from API
   */
  getNewsDetail(callback) {
    API.getDetail(this.data.id).then(res => {
      //console.log(res);
      if (res.data.result) {
        this.setNewsDetail(res.data.result);
        typeof callback === 'function' && callback();
      } else {
        wx.showToast({
          title: '网络异常',
        });
      }
    });
  },
  /**
   * set news detail to local variable
   */
  setNewsDetail(list){
    this.setData({
      title: list.title,
      time: list.date.slice(11, 16),
      source: list.source,
      content: list.content,
      count: list.readCount
    });
  }
})