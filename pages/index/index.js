import AV from "../libs/av-weapp-min.js"

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
 
  onLoad: function () {
  
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
 

  //事件处理函数
  bindViewTap: function (e) {
    // AV.User.loginWithWeapp().then(user => {
    //   // this.globalData.user = user;
    //   user.set("username", "我是开发者");
    //   user.save().then(function () {
    //     console.log("success");
    //   }, function (e) {
    //     console.log(e);
    //   })
    //   console.log(user);
    // }).catch(console.error);

    wx.navigateTo({
      url: '../shoppinglist/shoppinglist'
    })
  },
})
