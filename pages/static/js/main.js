$(document).ready(() => {
    let start;
    let end;
    let total = 0;
    let services = [];
    let mainDate;

    function getMilitaryTime(time, date) {
        let minutes = time.slice(-5, -3);
        let hour = parseInt(time.slice(0, 4), 10);

        if (time.slice(5).trim() == 'PM') {
            if (hour != 12) {
                return `${date}T${hour + 12}:${minutes}`;
            } else if (hour == 12) {
                return `${date}T${hour}:${minutes}`;
            }
        } else if (hour == 12) {
            return `${date}T${hour + 12}:${minutes}`;
        } else if (hour == 11 || hour == 10) {
            return `${date}T${hour}:${minutes}`;
        } else {
            return `${date}T0${hour}:${minutes}`;
        }
    }

    function getMilTime(time) {
        let minutes = time.slice(-5, -2);
        let hour = parseInt(time.slice(0, 4), 10);
        if (minutes != 0) {
            if (time.slice(5) == 'PM') {
                if (hour != 12) {
                    return `${hour + 12}:${minutes}`;
                } else if (hour == 12) {
                    return `${hour}:${minutes}`;
                } else {
                    return `0${hour}:${minutes}`;
                }
            } else if (hour == 12 || hour == 11 || hour == 10) { // AM
                return `${hour}:${minutes}`;
            } else {
                return `0${hour}:${minutes}`;
            }
        } else {
            if (time.slice(5) == 'PM') {
                if (hour != 12) {
                    return `${hour + 12}:00`;
                } else if (hour == 12) {
                    return `${hour}:00`
                } else {
                    return `0${hour}:00`;
                }
            } else if (hour == 12 || hour == 11 || hour == 10) {
                return time.slice(0, 5);
            } else {
                return ('0' + time.slice(0, 4));
            }
        }
    }

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
    const csrftoken = getCookie('csrftoken');

    class Schedule {
        setDateLimits() {
            $.ajax({
                url: window.location.href + "api/schedule/",
                success: function (data) {
                    const picker = new Pikaday({
                        field: document.getElementById("date"),
                        minDate: new Date(String(data[0].schedule_start_date)),
                        maxDate: new Date(String(data[0].schedule_end_date)),
                        format: "YYYY-MM-DD"
                    });
                }
            })
        }

        getBookings(timeslot, starttime, endtime, year, month, day) {
            let context = {
                timeslot: timeslot,
                starttime: starttime,
                endtime: endtime,
            }

            $.ajax({
                context: context,
                url: window.location.href + `api/reservations/${year}/${month}/${day}`,
                success: function (data) {
                    const hours = parseFloat(context.endtime.slice(0, 3)) - parseFloat(context.starttime.slice(0, 3));
                    const minutes = parseFloat(context.endtime.slice(3, 5) - parseFloat(context.starttime.slice(3, 5)));
                    const convertedHours = minutes / 60;
                    const total = hours + convertedHours;
                    const amountOfTimeslots = Math.floor(total / context.timeslot);
                    const start_hours = parseFloat(context.starttime.slice(0, 3)) + (parseFloat(context.starttime.slice(3, 5)) / 60);
                    console.log(start_hours);

                    $('.time-slots')
                        .empty()
                        .html('<p class=" text-light ">Select A Time</p>');

                    const bookings_list = Bookings.buildBookingsList(start_hours, context.timeslot, amountOfTimeslots);
                    const filtered_bookings_list = Bookings.filterBookings(bookings_list, data);

                    if (filtered_bookings_list.length === 0) {
                        $('.time-slots').append(`<div class="card p-2 mt-2 timeslot">
                                                    <p class="text-center mb-0 timeslot text-body">Sorry, all available time slots are taken. Please try another day.</p>
                                                </div>`)
                    } else {
                        for (let opening of filtered_bookings_list) {
                            $('.time-slots').append(`<div class="card p-2 mt-2 timeslot">
                                                        <p class="text-center mb-0 timeslot text-body" data-start="${opening.start}" data-end="${opening.end}">${opening.start} - ${opening.end}</p>
                                                     </div>`)
                        }

                        $('.time-slots .card p').click((event) => {
                            let step1 = $('.step-1');
                            start = event.target.getAttribute('data-start');
                            end = event.target.getAttribute('data-end');
                            console.log(start);
                            console.log(end);
                            step1.fadeOut(() => {
                                step1.toggleClass('d-none');
                                $('.step-2').toggleClass('d-none');
                            })
                        });
                    }
                }
            })
        }

        getAvalibility(year, month, day, weekday) {
            $.ajax({
                context: this,
                url: window.location.href + "api/schedule/",
                success: function (data) {
                    let timeSlot;
                    let startTime;
                    let endTime;
                    switch (weekday) {
                        case 0:
                            timeSlot = parseFloat(data[0].monday_time_block);
                            startTime = data[0].monday_start;
                            endTime = data[0].monday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 1:
                            timeSlot = parseFloat(data[0].tuesday_time_block);
                            startTime = data[0].tuesday_start;
                            endTime = data[0].tuesday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 2:
                            timeSlot = parseFloat(data[0].wednesday_time_block);
                            startTime = data[0].wednesday_start;
                            endTime = data[0].wednesday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 3:
                            timeSlot = parseFloat(data[0].thursday_time_block);
                            startTime = data[0].thursday_start;
                            endTime = data[0].thursday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 4:
                            timeSlot = parseFloat(data[0].friday_time_block);
                            startTime = data[0].friday_start;
                            endTime = data[0].friday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 5:
                            timeSlot = parseFloat(data[0].saturday_time_block);
                            startTime = data[0].saturday_start;
                            endTime = data[0].saturday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                        case 6:
                            timeSlot = parseFloat(data[0].sunday_time_block);
                            startTime = data[0].sunday_start;
                            endTime = data[0].sunday_end;
                            if (startTime == null && endTime == null) {
                                $('.time-slots')
                                    .empty()
                                    .html('<p class=" text-light text-center ">Sorry, There are no available openings. Select a different date.</p>')
                            } else {
                                this.getBookings(timeSlot, startTime, endTime, year, month, day);
                            }
                            break
                    }
                }
            })
        }
    }

    class Bookings {
        static buildBookingsList(start, slot, amount) {
            let arr = [];
            for (let i = 0; i < amount; i++) {
                let obj = {};
                let hour = Math.floor(start + (slot * i));
                let minutes = ((start + (slot * i)) % 1) * 60;
                let end_hour = Math.floor(start + slot * (i + 1));
                let end_min = ((start + slot * (i + 1)) % 1) * 60;

                if ((slot % 1) != 0) { // If Time Slot is not even hour
                    if (i == 1) {
                        if (hour < 12) {
                            if (minutes != 0) {
                                obj.start = `${hour}:${minutes} AM`;
                            } else {
                                obj.start = `${hour}:${minutes}0 AM`;
                            }
                        } else if (hour === 12) {
                            if (minutes != 0) {
                                obj.start = `${hour}:${minutes} PM`;
                            } else {
                                obj.start = `${hour}:${minutes}0 PM`;
                            }
                        } else if (hour > 12) {
                            if (minutes != 0) {
                                obj.start = `${hour - 12}:${minutes} PM`;
                            } else {
                                obj.start = `${hour - 12}:${minutes}0 PM`;
                            }
                        }

                        if (end_hour < 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour}:${end_min} AM`;
                            } else {
                                obj.end = `${end_hour}:${end_min}0 AM`;
                            }
                        } else if (end_hour === 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour}:${end_min} PM`;
                            } else {
                                obj.end = `${end_hour}:${end_min}0 PM`;
                            }
                        } else if (end_hour > 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour - 12}:${end_min} PM`;
                            } else {
                                obj.end = `${end_hour - 12}:${end_min}0 PM`;
                            }
                        }
                        arr.push(obj);
                    } else {
                        if (hour < 12) {
                            if (minutes != 0) {
                                obj.start = `${hour}:${minutes} AM`;
                            } else {
                                obj.start = `${hour}:${minutes}0 AM`;
                            }
                        } else if (hour === 12) {
                            if (minutes != 0) {
                                obj.start = `${hour}:${minutes} PM`;
                            } else {
                                obj.start = `${hour}:${minutes}0 PM`;
                            }
                        } else if (hour > 12) {
                            if (minutes != 0) {
                                obj.start = `${hour - 12}:${minutes} PM`;
                            } else {
                                obj.start = `${hour - 12}:${minutes}0 PM`;
                            }
                        }

                        if (end_hour < 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour}:${end_min} AM`;
                            } else {
                                obj.end = `${end_hour}:${end_min}0 AM`;
                            }
                        } else if (end_hour === 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour}:${end_min} PM`;
                            } else {
                                obj.end = `${end_hour}:${end_min}0 PM`;
                            }
                        } else if (end_hour > 12) {
                            if (end_min != 0) {
                                obj.end = `${end_hour - 12}:${end_min} PM`;
                            } else {
                                obj.end = `${end_hour - 12}:${end_min}0 PM`;
                            }
                        }
                        arr.push(obj);
                    }
                } else {
                    if (i == 1) {
                        if (hour < 12) {
                            obj.start = `${hour}:${minutes}0 AM`;
                        } else if (hour === 12) {
                            obj.start = `${hour}:${minutes}0 PM`;
                        } else if (hour > 12) {
                            obj.start = `${hour - 12}:${minutes}0 PM`;
                        }

                        if (end_hour < 12) {
                            obj.end = `${end_hour}:${end_min}0 AM`;
                        } else if (end_hour === 12) {
                            obj.end = `${end_hour}:${end_min}0 PM`;
                        } else if (end_hour > 12) {
                            obj.end = `${end_hour - 12}:${end_min}0 PM`;
                        }
                        arr.push(obj);
                    } else {
                        if (hour < 12) {
                            obj.start = `${hour}:${minutes}0 AM`;
                        } else if (hour === 12) {
                            obj.start = `${hour}:${minutes}0 PM`;
                        } else if (hour > 12) {
                            obj.start = `${hour - 12}:${minutes}0 PM`;
                        }

                        if (end_hour < 12) {
                            obj.end = `${end_hour}:${end_min}0 AM`;
                        } else if (end_hour === 12) {
                            obj.end = `${end_hour}:${end_min}0 PM`;
                        } else if (end_hour > 12) {
                            obj.end = `${end_hour - 12}:${end_min}0 PM`;
                        }
                        arr.push(obj);
                    }
                }
            }
            return arr;
        }

        static filterBookings(booking_list, booked_list) {
            if (booked_list.length == 0) {
                return booking_list;
            } else {
                let filtered_list = booking_list.filter(function (item) {
                    let addItem = true;
                    for (let res of booked_list) {
                        if (res.start.slice(11, 16).trim() === getMilTime(item.start).trim()) {
                            addItem = false;
                            break
                        }
                    }
                    return addItem;
                });
                return filtered_list;
            }
        }
    }

    const schedule = new Schedule();
    schedule.setDateLimits();

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
                    }, 750, function () {
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

    $('.step-1 button').click((event) => {
        event.preventDefault()
        let datestring = $('.step-1 form #date').val();
        console.log(datestring)
        mainDate = datestring
        if (datestring) {
            let date = new Date(datestring)
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate() + 1;
            let dayOfWeek = date.getDay();

            $('.time-slots')
                .empty()
                .html(
                    `<div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>`
                );

            schedule.getAvalibility(year, month, day, dayOfWeek)
        } else {
            $('#date-selection .form-group').append('<div class="alert alert-danger mt-2" role="alert">Please Select A Date.</div>')
            setTimeout(() => {
                $('.alert').remove();
            }, 1500)
        }
    })

    let email_data;
    let booking;

    $('.step-2 button').click((event) => {
        event.preventDefault();
        first_name = $('#first-name').val();
        last_name = $('#last-name').val();
        email = $('#email').val();
        phone = $('#phone').val();

        if (first_name && last_name && email && phone) {
            booking = {
                start: getMilitaryTime(start, mainDate),
                end: getMilitaryTime(end, mainDate),
                customer: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    cell: phone,
                },
                service: services,
            }

            email_data = {
                start: start,
                service: services,
                total: total,
                email: email,
                date: mainDate,
                phone: phone,
                name: first_name,
            }

            console.log(booking.start);
            console.log(booking.end);

            $('.step-2').fadeOut(function () {
                $('.step-3').toggleClass('d-none');

                $.ajax({
                    url: window.location.href + 'api/reservations/',
                    type: 'POST',
                    data: JSON.stringify(booking),
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'Content-Type': 'application/json',
                    },
                    success: function (data, status) {
                        $('.thank-you')
                            .empty()
                            .append('<div class="alert alert-success mt-2" role="alert">Thank you! Your reservation has been submitted. You will recieve an email with your appointment details shortly.</div>');

                        $.ajax({
                            url: window.location.href + 'api/email/',
                            type: 'POST',
                            headers: {
                                'X-CSRFToken': csrftoken,
                                'Content-Type': 'application/json',
                            },
                            data: JSON.stringify(email_data),
                            success: function () {
                                console.log('success');
                            }
                        })
                    }
                })
            });

        } else {
            $('.step-2').append('<div class="alert alert-danger mt-2" role="alert">Please fill out all the fields.</div>')
            setTimeout(() => {
                $('.alert').remove()
            }, 1500)
        }
    });

    $('.list-group-item').click((event) => {
        let price = parseFloat(event.target.getAttribute('data-price'));
        if (event.target.classList.contains('selected')) {
            total -= price;
            services = services.filter(service => service.title != event.target.innerText);
        } else {
            total += price;
            let obj = {
                title: event.target.innerText,
            }
            services.push(obj);
        }
        event.target.classList.toggle('selected');
    });
});