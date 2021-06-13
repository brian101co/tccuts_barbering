"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var csrftoken = getCookie('csrftoken');
var state = {
  date: null,
  booking: {
    start: null,
    end: null,
    price: 0,
    date: null,
    customer: {
      first_name: null,
      last_name: null,
      email: null,
      cell: null
    },
    service: []
  }
}; // Smooth Scroll

$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 350, function () {
        var $target = $(target);

        if ($target.is(":focus")) {
          // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        }

        ;
      });
    }
  }
}); // Get CSRF Cookie

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim(); // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function setCopyrightDate() {
  $(".copyright").html("&copy; ".concat(new Date().getFullYear(), " Isaac Slatten"));
}

function setClickEventonTimeBlocks() {
  $('.time-slots .card p').click(function (event) {
    var step1 = $('.step-1');
    state.booking.start = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-start');
    state.booking.end = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-end');
    state.booking.date = dayjs(state.booking.start).format("dddd, MMMM D YYYY, [at] h:mm a");
    step1.fadeOut(function () {
      step1.toggleClass('d-none');
      $('.step-2').toggleClass('d-none');
    });
  });
}

function showSpinner() {
  $('.time-slots').empty().html("<div class=\"d-flex justify-content-center\">\n                        <div class=\"spinner-border text-light\" role=\"status\">\n                            <span class=\"sr-only\">Loading...</span>\n                        </div>\n                    </div>");
}

function showFormValidationError() {
  $('.step-2').prepend('<div class="alert alert-danger mt-2" role="alert">Please fill out all the fields.</div>');
  setTimeout(function () {
    $('.alert').remove();
  }, 1500);
}

function showThankyouMessage() {
  $('.thank-you').empty().append('<div class="alert alert-success mt-2" role="alert">Thank you! Your reservation has been submitted. You will recieve an email with your appointment details shortly.</div>');
}

var Schedule = {
  setDateLimits: function setDateLimits() {
    $.ajax({
      url: window.location.href + "api/schedule/",
      success: function success(data) {
        var picker = new Pikaday({
          field: document.getElementById("date"),
          minDate: dayjs(data.schedule_start_date).toDate(),
          maxDate: dayjs(data.schedule_end_date).toDate(),
          format: "YYYY-MM-DD"
        });"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var csrftoken = getCookie('csrftoken');
var state = {
  date: null,
  booking: {
    start: null,
    end: null,
    price: 0,
    date: null,
    customer: {
      first_name: null,
      last_name: null,
      email: null,
      cell: null
    },
    service: []
  }
}; // Smooth Scroll

$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 350, function () {
        var $target = $(target);

        if ($target.is(":focus")) {
          // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        }

        ;
      });
    }
  }
}); // Get CSRF Cookie

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim(); // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function setCopyrightDate() {
  $(".copyright").html("&copy; ".concat(new Date().getFullYear(), " Isaac Slatten"));
}

function setClickEventonTimeBlocks() {
  $('.time-slots .card p').click(function (event) {
    var step1 = $('.step-1');
    state.booking.start = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-start');
    state.booking.end = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-end');
    state.booking.date = dayjs(state.booking.start).format("dddd, MMMM D YYYY, [at] h:mm a");
    step1.fadeOut(function () {
      step1.toggleClass('d-none');
      $('.step-2').toggleClass('d-none');
    });
  });
}

function showSpinner() {
  $('.time-slots').empty().html("<div class=\"d-flex justify-content-center\">\n                        <div class=\"spinner-border text-light\" role=\"status\">\n                            <span class=\"sr-only\">Loading...</span>\n                        </div>\n                    </div>");
}

function showSelectServicesFormError() {
  $('.step-2 .services-col').prepend('<div class="alert alert-danger mt-2" role="alert">Please select atleast one service.</div>');
  setTimeout(function () {
    $('.alert').remove();
  }, 3000);
}

function showFormValidationError() {
  $('.step-2').prepend('<div class="alert alert-danger mt-2" role="alert">Please fill out all the fields.</div>');
  setTimeout(function () {
    $('.alert').remove();
  }, 3000);
}

function showThankyouMessage() {
  $('.thank-you').empty().append('<div class="alert alert-success mt-2" role="alert">Thank you! Your reservation has been submitted. You will recieve an email with your appointment details shortly.</div>');
}

var Schedule = {
  setDateLimits: function setDateLimits() {
    $.ajax({
      url: window.location.href + "api/schedule/",
      success: function success(data) {
        var picker = new Pikaday({
          field: document.getElementById("date"),
          minDate: dayjs(data.schedule_start_date).toDate(),
          maxDate: dayjs(data.schedule_end_date).toDate(),
          format: "YYYY-MM-DD"
        });
      }
    });
  },
  getOpenings: function getOpenings(date) {
    $.ajax({
      url: window.location.href + "api/reservations/?date=".concat(date),
      success: function success(data) {
        var timeSlotContainer = $('.time-slots');
        var timeblocks = JSON.parse(data);
        timeSlotContainer.empty().html('<p class=" text-light ">Select A Time</p>');

        if (timeblocks.length != 0) {
          var _iterator = _createForOfIteratorHelper(timeblocks),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var timeblock = _step.value;
              var startHour = Math.floor(timeblock.start_time) > 12 ? Math.floor(timeblock.start_time) - 12 : Math.floor(timeblock.start_time);
              var startMeridiem_indicator = Math.floor(timeblock.start_time) > 12 ? "PM" : "AM";
              var startMinutes = timeblock.start_time % 1 * 60 == 0 ? "00" : timeblock.start_time % 1 * 60;
              var endHour = Math.floor(timeblock.end_time) > 12 ? Math.floor(timeblock.end_time) - 12 : Math.floor(timeblock.end_time);
              var endMeridiem_indicator = Math.floor(timeblock.end_time) > 12 ? "PM" : "AM";
              var endMinutes = timeblock.end_time % 1 * 60 == 0 ? "00" : timeblock.end_time % 1 * 60;
              timeSlotContainer.append("<div class=\"card p-2 mt-2 timeslot\">\n                                                <p class=\"text-center mb-0 timeslot text-body\" data-start=\"".concat(Math.floor(timeblock.start_time), ":").concat(startMinutes, "\" data-end=\"").concat(Math.floor(timeblock.end_time), ":").concat(endMinutes, "\">").concat(startHour, ":").concat(startMinutes, " ").concat(startMeridiem_indicator, " - ").concat(endHour, ":").concat(endMinutes, " ").concat(endMeridiem_indicator, "</p>\n                                             </div>"));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          timeSlotContainer.empty().append("<div class=\"card p-2 mt-2 timeslot\">\n                                                <p class=\"text-center mb-0 timeslot text-body\">Sorry, There are no available openings. Please select a different day.</p>\n                                            </div>");
        }

        setClickEventonTimeBlocks();
      }
    });
  }
};
Schedule.setDateLimits();
setCopyrightDate();
$('.step-1 button').click(function (event) {
  event.preventDefault();
  var selectedDate = dayjs($('.step-1 form #date').val());

  if (selectedDate.year()) {
    showSpinner();
    Schedule.getOpenings(selectedDate.format("YYYY-MM-DD"));
    state.date = selectedDate;
  }
});
$('.step-2 button').click(function (event) {
  event.preventDefault();
  var first_name = $('#first-name').val();
  var last_name = $('#last-name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var step2 = $('.step-2');

  if (first_name && last_name && email && phone) {
    state.booking.customer.first_name = first_name;
    state.booking.customer.last_name = last_name;
    state.booking.customer.email = email;
    state.booking.customer.cell = phone;

    if (state.booking.service.length < 1) {
      showSelectServicesFormError();
      return;
    }

    step2.fadeOut(function () {
      $('.step-3').toggleClass('d-none');
      $.ajax({
        url: window.location.href + 'api/reservations/',
        type: 'POST',
        data: JSON.stringify(state.booking),
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json'
        },
        success: function success(data, status) {
          showThankyouMessage();
        }
      });
    });
  } else {
    showFormValidationError();
  }
});
$('.step-2 .list-group-item').click(function (event) {
  var price = parseFloat(event.target.getAttribute('data-price'));
  var checkmark = event.target.firstElementChild;

  if (event.target.classList.contains('selected')) {
    state.booking.price -= price;
    state.booking.service = state.booking.service.filter(function (service) {
      return service.title != event.target.innerText;
    });
  } else {
    state.booking.price += price;
    state.booking.service.push({
      title: event.target.innerText
    });
  }

  event.target.classList.toggle('selected');
  checkmark.classList.toggle("d-none");
});
      }
    });
  },
  getOpenings: function getOpenings(date) {
    $.ajax({
      url: window.location.href + "api/reservations/?date=".concat(date),
      success: function success(data) {
        var timeSlotContainer = $('.time-slots');
        var timeblocks = JSON.parse(data);
        timeSlotContainer.empty().html('<p class=" text-light ">Select A Time</p>');

        if (timeblocks.length != 0) {
          var _iterator = _createForOfIteratorHelper(timeblocks),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var timeblock = _step.value;
              var startHour = Math.floor(timeblock.start_time) > 12 ? Math.floor(timeblock.start_time) - 12 : Math.floor(timeblock.start_time);
              var startMeridiem_indicator = Math.floor(timeblock.start_time) > 12 ? "PM" : "AM";
              var startMinutes = timeblock.start_time % 1 * 60 == 0 ? "00" : timeblock.start_time % 1 * 60;
              var endHour = Math.floor(timeblock.end_time) > 12 ? Math.floor(timeblock.end_time) - 12 : Math.floor(timeblock.end_time);
              var endMeridiem_indicator = Math.floor(timeblock.end_time) > 12 ? "PM" : "AM";
              var endMinutes = timeblock.end_time % 1 * 60 == 0 ? "00" : timeblock.end_time % 1 * 60;
              timeSlotContainer.append("<div class=\"card p-2 mt-2 timeslot\">\n                                                <p class=\"text-center mb-0 timeslot text-body\" data-start=\"".concat(Math.floor(timeblock.start_time), ":").concat(startMinutes, "\" data-end=\"").concat(Math.floor(timeblock.end_time), ":").concat(endMinutes, "\">").concat(startHour, ":").concat(startMinutes, " ").concat(startMeridiem_indicator, " - ").concat(endHour, ":").concat(endMinutes, " ").concat(endMeridiem_indicator, "</p>\n                                             </div>"));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          timeSlotContainer.empty().append("<div class=\"card p-2 mt-2 timeslot\">\n                                                <p class=\"text-center mb-0 timeslot text-body\">Sorry, There are no available openings. Please select a different day.</p>\n                                            </div>");
        }

        setClickEventonTimeBlocks();
      }
    });
  }
};
Schedule.setDateLimits();
setCopyrightDate();
$('.step-1 button').click(function (event) {
  event.preventDefault();
  var selectedDate = dayjs($('.step-1 form #date').val());

  if (selectedDate.year()) {
    showSpinner();
    Schedule.getOpenings(selectedDate.format("YYYY-MM-DD"));
    state.date = selectedDate;
  }
});
$('.step-2 button').click(function (event) {
  event.preventDefault();
  var first_name = $('#first-name').val();
  var last_name = $('#last-name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var step2 = $('.step-2');

  if (first_name && last_name && email && phone) {
    state.booking.customer.first_name = first_name;
    state.booking.customer.last_name = last_name;
    state.booking.customer.email = email;
    state.booking.customer.cell = phone;
    step2.fadeOut(function () {
      $('.step-3').toggleClass('d-none');
      $.ajax({
        url: window.location.href + 'api/reservations/',
        type: 'POST',
        data: JSON.stringify(state.booking),
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json'
        },
        success: function success(data, status) {
          showThankyouMessage();
        }
      });
    });
  } else {
    showFormValidationError();
  }
});
$('.step-2 .list-group-item').click(function (event) {
  var price = parseFloat(event.target.getAttribute('data-price'));
  var checkmark = event.target.firstElementChild;

  if (event.target.classList.contains('selected')) {
    state.booking.price -= price;
    state.booking.service = state.booking.service.filter(function (service) {
      return service.title != event.target.innerText;
    });
  } else {
    state.booking.price += price;
    state.booking.service.push({
      title: event.target.innerText
    });
  }

  event.target.classList.toggle('selected');
  checkmark.classList.toggle("d-none");
});