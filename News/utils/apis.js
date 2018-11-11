const NEWS_URL = "https://test-miniprogram.com/api/news";
const LIST_URL = NEWS_URL + "/list";
const DETAIL_URL = NEWS_URL + "/detail";

function formatTime(isoString) {
  const date = new Date(isoString)
  return `${new Intl.DateTimeFormat('chinese').format(date)} ${date.getHours()}:${date.getMinutes()}`
}

function get(url, newsType){
  let promise = new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      data:newsType,
      method:'GET',
      success:resolve,
      fail:reject
    });
  });
  return promise;
}

export function getList(newsType){
  return get(LIST_URL,{"type": newsType}).then(res => {
    if (res.data.code === 200) {
      return res;
    }else{
      return Promise.reject(res);
    }
  })
}

export function getDetail(id){
  return get(DETAIL_URL,{"id":id}).then(res => {
    if(res.data.code === 200){
      return res;
    }else{
      return Promise.reject(res);
    }
  })
}