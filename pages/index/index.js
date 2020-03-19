import AV from "../libs/av-weapp-min.js"

//index.js
//获取应用实例
const app = getApp();
var avUser=AV.User.current;
Page({
  data: {
    date: '2020-03'
  },

  onLoad: function () {
    login();

  },
  onPullDownRefresh() {
    wx.showToast({
      title: '正在刷新...',
      icon: 'loading'
    });
  },
  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast();
      }
    })
  },
  bindViewTap:function(){
    wx.navigateTo({
      url: '../editdaybook/editdaybook',
    })
  },
  bindDateChange1(e) {
    this.setData({
      date: e.detail.value
    })
  }
});

function login() {
  AV.User.loginWithWeapp().then(user => {
    console.log(user);
    avUser=user;
    app.globalData.username =user.get('username');
    if (!app.globalData.username) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  }).catch(console.error);
}

function getDaybook(){

}
