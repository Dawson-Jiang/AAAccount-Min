// pages/editdaybook/editdaybook.js
import AV from "../libs/av-weapp-min.js"

const app = getApp();
var avUser = AV.User.current();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    thumbPics: [],
    categorys: [],
    family: {},
    categoryIndex: 0,
    members: [],
    payer: {},
    consumers: [],
    is_family:true,
    date:Date()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const th = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('edit', function (data) {
      th.setData({
        ...data
      })
    });
    th.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    });
    th.loadCategory();
    th.loadMembers();
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ urls: ['https://www.baidu.com/img/baidu_jgylogo3.gif'] })
      }, 1000)
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  bindCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit(e) {
    const value = e.detail.value;

    if (!value.money) {
      wx.showToast({
        title: '消费金额不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var dbook;
    if (this.data.objId) {
      dbook = AV.Object.createWithoutData("DayBook", this.data.objId);
    } else {
      dbook = new AV.Object("DayBook");
    }
    dbook.set("money", value.money);
    dbook.set("creator", avUser);
    dbook.set("category", value.category);

    if (th.data.family) { 
      dbook.set("payer", value.payer);
    } else {
      dbook.set("payer", avUser);
    }

    dbook.set("pictures", this.data.pics);
    dbook.set("thumbPictures", this.data.thumbPics);
    dbook.set("date", value.date);
    dbook.set("description", value.des);

    dbook.save().then(function(res){

    },function  (error) {
      
    })
  },
  loadMembers: function () {
    const th = this;
    let query = new AV.Query("Members");
    query.equalTo("family", this.data.family)
    query.find().then(function (fs) {
      const tlist = [];
      for (let item of fs) {
        tlist.push(item.get("user").getUsername());
      }
      th.setData({
        members: tlist
      })
    }, function (error) {
      // 异常处理
    });
  },
  loadCategory: function () {
    const th = this;
    let query = new AV.Query("ConsumeCategory");
    query.find().then(function (cgs) {
      const tlist = [];
      for (let item of cgs) {
        tlist.push(item.get("name"));
      }
      th.setData({
        categorys: tlist
      })
    }, function (error) {
      // 异常处理
      th.stopPullDownRefresh();
    });
  }
});