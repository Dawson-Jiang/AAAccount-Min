import AV from "../libs/av-weapp-min.js"

Page({
  data: {
    categoryArray: ['肉类', '蔬菜', '其他'],
    countArray: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ['.'], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ['斤', '两', '千克', '克', '只', '根', '把', '篮', '块', '颗', '坨', '袋', '升', '壶', '瓶', '罐', '盒', '片','个','条','张','粒','朵','份','件','枚','顶','幅','捆','杯','箱','枝','支']]
  },
  onLoad: function () {
    const th = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('edit', function (data) {
      th.setData({
        ...data
      })
    })
  },


  formSubmit(e) {
    const eventChannel = this.getOpenerEventChannel();
    const v = e.detail.value;
    if (!v.category) {
      wx.showToast({
        title: '请选择类别',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!v.name) {
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var shp;
    if (this.data.objId) {
      shp = AV.Object.createWithoutData('ShoppingList', this.data.objId);
    } else {
      shp = new AV.Object('ShoppingList');
    }

    shp.set("category", v.category);
    shp.set("name", v.name);
    shp.set("count", v.count);
    shp.set("des", v.des);
    shp.set("state", Number(v.state));
    // 将对象保存到云端
    shp.save().then(function (tobj) {
      // 成功保存之后，执行其他逻辑
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        complete: (res) => {
          eventChannel.emit("edit", true);
        },
      })
    }, function (error) {
      // 异常处理
      wx.showToast({
        title: '保存失败',
        icon: 'none',
        duration: 2000
      })
    });
  },
  bindCategoryChange(e) {
    this.setData({
      category: this.data.categoryArray[e.detail.value]
    })
  },
  bindCountChange(e) {
    // var ct = '';
    const cv = e.detail.value;
    const cas = this.data.countArray;
    var ct = cas[0][cv[0]] * 10 + cas[1][cv[1]] + cas[3][cv[3]] * 0.1
    this.setData({
      count: '' + ct + cas[4][cv[4]]
    })
  }
})