// pages/editdaybook/editdaybook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: []
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
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
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
        resolve({urls:['https://www.baidu.com/img/baidu_jgylogo3.gif']})
      }, 1000)
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  formSubmit(e) {
    const value = e.detail.value;

    var dbook;
    if (this.data.objId) {
      dbook = AV.Object.createWithoutData('Daybook', this.data.objId);
    } else {
      dbook = new AV.Object('Daybook');
    }
  }
})