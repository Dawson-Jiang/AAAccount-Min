import  AV  from "../libs/av-weapp-min";

// pages/login/login.js

//获取应用实例
const app = getApp();
const avUser=AV.User.current;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    avUser.set("username", e.detail.userInfo.nickName);
    avUser.save().then(function () {
      console.log("success");
      wx.navigateBack({
        complete: (res) => { },
      })
    }, function (e) {
      console.log(e);
    })
  }
})