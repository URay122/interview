$(document).ready(function () {
  // 驗證手機格式
  $.validator.addMethod("mobile", function (value, element) {
    let pattern = /^[0][9]\d{8}$/;
    if (pattern.test(value)) {
      return pattern.test(value);
    }
  });

  // /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
  // 驗證中英文
  $.validator.addMethod("language", function (value, element) {
    let pattern = /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
    if (pattern.test(value)) {
      return pattern.test(value);
    }
  });

  // 驗證datalist
  $.validator.addMethod("datalist", function (value, element) {
    let list = $("#" + $(element).attr("list")).find("option");
    let isValid = false;
    for (let i = 0; i < list.length; i++) {
      if ($(list[i]).val() === value) {
        isValid = true;
        break;
      }
    }
    return isValid;
  });

  // 錯誤訊息
  let validate = $("#info").validate({
    rules: {
      guest_name: {
        required: true,
        language: true,
      },
      guest_phone: {
        required: true,
        mobile: true,
      },
      amount: {
        required: true,
        number: true,
        min: 0,
      },
      store: {
        required: true,
        datalist: true,
      },
      payment: {
        required: true,
        datalist: true,
      },
    },
    messages: {
      guest_name: {
        required: "請輸入名字",
        language: "只能輸入中英文",
      },
      guest_phone: {
        required: "請輸入電話號碼",
        mobile: "只能輸入數字且長度必須為10碼，須為手機格式",
      },
      amount: {
        required: "請輸入金額",
        number: "只能輸入數字且最小為0",
        min: "只能輸入數字且最小為0",
      },
      store: {
        required: "請選擇商店",
        datalist: "不可輸入選項以外的文字",
      },
      payment: {
        required: "請選擇付款方式",
        datalist: "不可輸入選項以外的文字",
      },
    },
  });

  // 單個input驗證 改變按鈕狀態
  let inputValidations = {};
  $("#info input").each(function () {
    inputValidations[$(this).attr("name")] = false;
  });

  $("#info input").on("keyup input", function () {
    let input = $(this);
    let name = input.attr("name");
    if (input.valid()) {
      inputValidations[name] = true;
    } else {
      inputValidations[name] = false;
    }
    validateStatus();
  });

  // 按鈕狀態改變
  function validateStatus() {
    let allInputsValid = Object.values(inputValidations).every(function (
      validation
    ) {
      return validation;
    });
    if (allInputsValid) {
      $("#btn-submit img").attr("src", "./image/success.png").show();
      $("#btn-submit h5").text("success");
      $("#error-message").hide();
    } else {
      $("#btn-submit img").attr("src", "./image/failure.png").show();
      $("#btn-submit h5").text("failure");
      $("#error-message").css("display", "block");
    }
  }
  // 點擊按鈕進行表單驗證
  $(document).ready(function () {
    $("#btn-submit").click(function () {
      console.log($("#info").valid());
      // $("#info").submit();
    });
  });
});

// 讓後端使用data-value
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input[list]").forEach(function (input) {
    input.addEventListener("input", function (e) {
      var input = e.target,
        list = input.getAttribute("list"),
        options = Array.from(document.getElementById(list).options),
        hiddenInput = document.getElementById(
          input.getAttribute("id") + "Input-hidden"
        ),
        inputValue = input.value;
      for (let i = 0; i < options.length; i++) {
        var currentoption = options[i];
        if (currentoption.innerText === inputValue) {
          hiddenInput.value = currentoption.getAttribute("data-value");
          break;
        }
      }
      if (currentoption.value !== inputValue) {
        console.log("undefined");
      } else if (inputValue) {
        console.log(hiddenInput.value);
      }
    });
  });
});
// 點選ＦＯＲＭ滑動至ＦＯＲＭ表單
$(document).ready(function () {
  $("#section1").on("click", function (e) {
    let element = $("#section2");
    // console.log(element)
    if (element !== "") {
      e.preventDefault();
      // console.log(element)
      $("html,body").animate(
        {
          scrollTop: $(element).offset().top - 60,
        },
        50,
        function () {
          console.log($(element).offset().top);
          window.location.hash = element.attr("id");
        }
      );
    }
  });
});
