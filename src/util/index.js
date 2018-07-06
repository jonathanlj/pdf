// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

const util = function (Vue, options) {
  Vue.prototype.validatePhone = function (phoneNum) {
    let phoneReg = /^1[0-9]{10}$/;
    if (!phoneReg.test(phoneNum)) {
      return { error: "手机号码格式错误" };
    }
    return null;
  };

  Vue.prototype.validatePasword = function (password) {
    let passwordReg = /^[a-zA-Z0-9_]{6,16}$/i;
    if (!passwordReg.test(password)) {
      return { error: "密码格式不正确" };
    }
    return null;
  };

  Vue.prototype.validateId = function (IdNum) {
    let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idReg.test(IdNum)) {
      return { error: "身份证格式错误" };
    }
    return null;
  };

  Vue.prototype.trim = function (s) {
    s = (s !== undefined) ? s : this;
    return (typeof s !== "string") ? s : s.replace(this.REGX_TRIM, "");
  };

  Vue.prototype.setLocalData = function (skey, svalue) {
    if (window.localStorage) {
      window.localStorage.setItem(skey, svalue);
    } else {
      let exdate = new Date();
      exdate.setYear(exdate.getYear() + 6);
      document.cookie = skey + "=" + escape(svalue) + ";expires=" + exdate.toGMTString();
    };
  };

  Vue.prototype.getLocalData = function (skey) {
    let resultVal = "";
    if (window.localStorage) {
      resultVal = window.localStorage.getItem(skey);
    } else {
      let re = new RegExp(skey + "=([^;$]*)", "i");
      resultVal = re.test(unescape(document.cookie)) ? RegExp["$1"] : "";
    };
    return resultVal;
  };

  Vue.prototype.clearLocalData = function (skey) {
    if (window.localStorage) {
      window.localStorage.setItem(skey, "");
      window.localStorage.removeItem(skey);
    } else {
      document.cookie = skey + "=" + escape("") + ";expires=1";
    };
  };

  Vue.prototype.getPdf = function () {
    var title = this.htmlTitle
    html2Canvas(document.querySelector('#pdfDom'), {
      allowTaint: true
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(title + '.pdf')
    })
  };
};

export default util;
