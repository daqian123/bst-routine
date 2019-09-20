import { getNewDateArry } from "@/utils/dateTime"
function Upyun(options) {
  this.bucket = options.bucket
  this.operator = options.operator
  this.getSignatureUrl = options.getSignatureUrl
}
var date = (new Date()).toGMTString()
let [year, mont, newDate, hour, seco, minu] = getNewDateArry()
Upyun.prototype.upload = function (options) {
  var self = this
  if (!options.remotePath) {
    options.remotePath = options.localPath.split('//')[1]
  }
  var opts = {
    'save-key': `${options.remotePath}/${year}${mont}${newDate}${hour}${seco}${minu}${getMathRandom()}.${getImageType(options.localPath)}`,
    bucket: self.bucket,
    expiration: Math.round(new Date().getTime() / 1000) + 3600,
    date: date
  }
  var policy = Base64.encode(JSON.stringify(opts))
  var data = ['POST', '/' + self.bucket, date, policy].join('&')
  self.getSignature(data, function (err, signature) {
    if (err) {
      options.fail && options.fail(err)
      options.complete && options.complete(err)
      return
    }
    wx.uploadFile({
      url: `https://v0.api.upyun.com/${self.bucket}`,
      filePath: options.localPath,
      name: 'file',
      formData: {
        authorization: `UPYUN ${self.operator}:${signature}`,
        policy: policy
      },
      success: options.success,
      fail: options.fail,
      complete: options.complete
    })
  })
}
Upyun.prototype.getVideoCover = function (options) {
  var self = this
  if (!options.remotePath) {
    options.remotePath = options.localPath.split('//')[1]
  }
  let save_as = `${options.remotePath}${year}${mont}${newDate}${hour}${seco}${minu}${getMathRandom()}.png`
  var data = ['POST', '/bst-upload-images/snapshot', date].join('&')
  self.getSignature(data, function (err, signature) {
    if (err) {
      options.fail && options.fail(err)
      options.complete && options.complete(err)
      return
    }
    console.log(options)
    wx.request({
      url: `https://p1.api.upyun.com/bst-upload-images/snapshot`,
      data: {
        source: options.localPath,
        save_as,
        point: "00:00:01",
        format: "png"
      },
      method: "POST",
      header: {
        "authorization": `UPYUN ${self.operator}:${signature}`,
        'X-Date': date,
        'Content-Type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          options.success({ save_as })
        }
      },
      fail: options.fail,
      complete: options.complete
    })
  })
}
Upyun.prototype.getVideoInfo = function (options) {
  var self = this
  var data = ['POST', '/bst-upload-images/avmeta/get_meta', date].join('&')
  self.getSignature(data, function (err, signature) {
    if (err) {
      options.fail && options.fail(err)
      options.complete && options.complete(err)
      return
    }
    wx.request({
      url: `https://p1.api.upyun.com/bst-upload-images/avmeta/get_meta`,
      data: {
        source: options.localPath
      },
      method: "POST",
      header: {
        "authorization": `UPYUN ${self.operator}:${signature}`,
        'X-Date': date,
        'Content-Type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          let video_height, video_width
          res.data.streams.forEach(item => {
            if (item.video_height > 0) video_height = item.video_height
            if (item.video_width > 0) video_width = item.video_width
          })
          options.success({ width: video_width, height: video_height })
        }
      },
      fail: options.fail,
      complete: options.complete
    })
  })
}
function getMathRandom() {
  let a = 0
  for (let i = 0; i < 6; i++) {
    a += parseInt(Math.random() * 10).toString()
  }
  return a
}
function getImageType(str) {
  let a = str.substring(str.length - 5, str.length).split(".")[1]
  return a
}
Upyun.prototype.getSignature = function (data, cb) {
  wx.request({
    url: this.getSignatureUrl,
    data: {
      param: { data, mini: 1 }
    },
    success: function (res) {
      cb(null, res.data.info.signature)
    },
    fail: function (err) {
      cb(err)
    }
  })
}

/* eslint-disable */
var Base64 = {
  // private property
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  // public method for encoding
  encode: function (input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = Base64._utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
    }
    return output
  },
  // public method for decoding
  decode: function (input) {
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++))
      enc2 = this._keyStr.indexOf(input.charAt(i++))
      enc3 = this._keyStr.indexOf(input.charAt(i++))
      enc4 = this._keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = Base64._utf8_decode(output)
    return output
  },
  // private method for UTF-8 encoding
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  // private method for UTF-8 decoding
  _utf8_decode: function (utftext) {
    var string = ''
    var i = 0
    var c = c1 = c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}
/* eslint-enable */

export { Upyun }
