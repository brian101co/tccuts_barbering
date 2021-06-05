const csrftoken = getCookie('csrftoken');
const state = {
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
            cell: null,
            recieve_updates: false
        },
        service: [],
    }
}
// Smooth Scroll
$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 350, function () {
                    var $target = $(target);
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    };
                });
            }
        }
    });

// Get CSRF Cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function setCopyrightDate() {
    $(".copyright").html(`&copy; ${new Date().getFullYear()} Isaac Slatten`);
}
function setClickEventonTimeBlocks() {
    $('.time-slots .card p').click((event) => {
        let step1 = $('.step-1');
        state.booking.start = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-start');
        state.booking.end = state.date.format("YYYY-MM-DD") + "T" + event.target.getAttribute('data-end');
        state.booking.date = dayjs(state.booking.start).format("dddd, MMMM D YYYY, [at] h:mm a");
        step1.fadeOut(() => {
            step1.toggleClass('d-none');
            $('.step-2').toggleClass('d-none');
        })
    });
}
function showSpinner() {
    $('.time-slots')
        .empty()
        .html(
            `<div class="d-flex justify-content-center">
                        <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>`
        );
}
function showFormValidationError() {
    $('.step-2').prepend('<div class="alert alert-danger mt-2" role="alert">Please fill out all the fields.</div>')
    setTimeout(() => {
        $('.alert').remove()
    }, 1500);
}
function showThankyouMessage() {
    $('.thank-you')
        .empty()
        .append('<div class="alert alert-success mt-2" role="alert">Thank you! Your reservation has been submitted. You will recieve an email with your appointment details shortly.</div>');
}

const Schedule = {
    setDateLimits() {
        $.ajax({
            url: window.location.href + "api/schedule/",
            success: function (data) {
                const picker = new Pikaday({
                    field: document.getElementById("date"),
                    minDate: new Date(String(data.schedule_start_date)),
                    maxDate: new Date(String(data.schedule_end_date)),
                    format: "YYYY-MM-DD"
                });
            }
        });
    },
    getOpenings(date) {
        $.ajax({
            url: window.location.href + `api/reservations/?date=${date}`,
            success: function (data) {
                const timeSlotContainer = $('.time-slots');
                const timeblocks = JSON.parse(data);
                timeSlotContainer.empty().html('<p class=" text-light ">Select A Time</p>');

                if (timeblocks.length != 0) {
                    for (const timeblock of timeblocks) {
                        const startHour = Math.floor(timeblock.start_time) > 12 ? Math.floor(timeblock.start_time) - 12 : Math.floor(timeblock.start_time);
                        const startMeridiem_indicator = Math.floor(timeblock.start_time) > 12 ? "PM" : "AM";
                        const startMinutes = ((timeblock.start_time % 1) * 60) == 0 ? "00" : (timeblock.start_time % 1) * 60;
                        const endHour = Math.floor(timeblock.end_time) > 12 ? Math.floor(timeblock.end_time) - 12 : Math.floor(timeblock.end_time)
                        const endMeridiem_indicator = Math.floor(timeblock.end_time) > 12 ? "PM" : "AM";
                        const endMinutes = ((timeblock.end_time % 1) * 60) == 0 ? "00" : (timeblock.end_time % 1) * 60;

                        timeSlotContainer.append(`<div class="card p-2 mt-2 timeslot">
                                                <p class="text-center mb-0 timeslot text-body" data-start="${Math.floor(timeblock.start_time)}:${startMinutes}" data-end="${Math.floor(timeblock.end_time)}:${endMinutes}">${startHour}:${startMinutes} ${startMeridiem_indicator} - ${endHour}:${endMinutes} ${endMeridiem_indicator}</p>
                                             </div>`);
                    }
                } else {
                    timeSlotContainer.empty().append(`<div class="card p-2 mt-2 timeslot">
                                                <p class="text-center mb-0 timeslot text-body">Sorry, There are no available openings. Please select a different day.</p>
                                            </div>`);
                }
                setClickEventonTimeBlocks();
            }
        });
    }
}

Schedule.setDateLimits();
setCopyrightDate();

$('.step-1 button').click((event) => {
    event.preventDefault();
    let selectedDate = dayjs($('.step-1 form #date').val());
    if (selectedDate.year()) {
        showSpinner();
        Schedule.getOpenings(selectedDate.format("YYYY-MM-DD"));
        state.date = selectedDate;
    }
});

$('.step-2 button').click((event) => {
    event.preventDefault();
    const first_name = $('#first-name').val();
    const last_name = $('#last-name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const recieve_updates = $('#recieve-updates').is(':checked');
    const step2 = $('.step-2');

    if (first_name && last_name && email && phone) {
        state.booking.customer.first_name = first_name;
        state.booking.customer.last_name = last_name;
        state.booking.customer.email = email;
        state.booking.customer.cell = phone;
        state.booking.customer.recieve_updates = recieve_updates;

        step2.fadeOut(function () {
            $('.step-3').toggleClass('d-none');

            $.ajax({
                url: window.location.href + 'api/reservations/',
                type: 'POST',
                data: JSON.stringify(state.booking),
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json',
                },
                success: function (data, status) {
                    showThankyouMessage();
                }
            });
        });
    } else {
        showFormValidationError();
    }
});

$('.step-2 .list-group-item').click((event) => {
    const price = parseFloat(event.target.getAttribute('data-price'));
    const checkmark = event.target.firstElementChild;
    if (event.target.classList.contains('selected')) {
        state.booking.price -= price;
        state.booking.service = state.booking.service.filter(service => service.title != event.target.innerText);
    } else {
        state.booking.price += price;
        state.booking.service.push({title: event.target.innerText});
    }
    event.target.classList.toggle('selected');
    checkmark.classList.toggle("d-none");
});