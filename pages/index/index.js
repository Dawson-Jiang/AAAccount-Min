import AV from "../libs/av-weapp-min.js"

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },

  //事件处理函数
  bindViewTap: function (e) {
    let th = this;
    let shp = e.currentTarget.dataset.shp ? e.currentTarget.dataset.shp : {}
    wx.navigateTo({
      url: '../logs/logs',
      events: {
        edit: function (data) {
          if (data) {//刷新数据
            th.getListData();
          }
        }
      },
      success: function (res) {
        res.eventChannel.emit('edit', shp);
      }
    })
  },
  onLoad: function () {
    this.getListData();
  },

  getListData: function () {
    const th = this;
    let query = new AV.Query('ShoppingList');
    query.find().then(function (spl) {
      th.handleList(spl);
      th.stopPullDownRefresh();
    }, function (error) {
      // 异常处理
      th.stopPullDownRefresh();
    });
  },

  handleList: function (spl) {
    const tlist = [{
      category: "肉类",
      list: []
    }, {
      category: "蔬菜",
      list: []
    }, {
      category: "其他",
      list: []
    }];
    const notBuy = {
      category: "无需购买",
      list: []
    }
    //分组
    for (let item of spl) {
      var objItm;
      if (item.get("state") == 0) {
        objItm = notBuy
      }
      else {
        for (let itm of tlist) {
          if (item.get("category") == itm.category) {
            objItm = itm;
            break;
          }
        }
      }
      if (objItm == null) {
        objItm = {
          category: item.get("category"),
          list: []
        }
        tlist.push(objItm);
      }
      objItm.list.push({
        objId: item.id,
        name: item.get("name"),
        count: item.get("count"),
        des: item.get("des"),
        state: item.get("state"),
        category: item.get("category")
      })
      objItm = null;
    }
    if (notBuy.list.length > 0) {
      tlist.push(notBuy);
    }

    this.setData({
      list: tlist
    })
  },

  onPullDownRefresh() {
    wx.showToast({
      title: '正在刷新...',
      icon: 'loading'
    });
    this.getListData();
  },

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast();
      }
    })
  },
  //事件处理函数
  bindViewTap2: function (e) {
    AV.User.loginWithWeapp().then(user => {
      // this.globalData.user = user;
      user.set("username", "我是开发者");
      user.save().then(function () {
        console.log("success");
      }, function (e) {
        console.log(e);
      })
      console.log(user);
    }).catch(console.error);
  },
})
