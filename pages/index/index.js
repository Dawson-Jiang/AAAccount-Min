import AV from "../libs/av-weapp-min.js"

//index.js
//获取应用实例
const app = getApp();
var avUser = AV.User.current();
Page({
  data: {
    date: '2020-03',
    families: [{ name: "我的" }],
    familyIndex:0,
    daybooks: [],
  },

  onLoad: function () {
    login();
  },
  onShow: function () {
    // loadFamilies();
  },
  onPullDownRefresh() {
    wx.showToast({
      title: '正在刷新...',
      icon: 'loading'
    });
    loadDaybook();
  },
  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast();
      }
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../editdaybook/editdaybook',
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindFamilyChange(e) {
    const th = this;
    this.setData({
      familyIndex: e.detail.value
    }, (ee) =>{
      loadDaybook();
    })
  }
});

function login() {
  if (avUser) return;
  AV.User.loginWithWeapp().then(user => {
    console.log(user);
    avUser = user;
    app.globalData.username = user.get('username');
    if (!app.globalData.username) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      loadFamilies();
    }
  }).catch(console.error);
};
function loadFamilies() {
  const th = this;
  let query1 = new AV.Query("Family");
  query1.equalTo("members", avUser)
  let query2 = new AV.Query("Family");
  query2.equalTo("creator", avUser);
  let query = AV.Query.or(query1, query2);
  query.find().then(function (fs) {
    const tlist = [{ name: "我的" }];
    for (let item of fs) {
      tlist.push(item.tojson());
    }
    th.setData({
      families: tlist
    });
    loadDaybook();
  }, function (error) {
    // 异常处理
    th.stopPullDownRefresh();
  });
};
function loadDaybook() {

};
