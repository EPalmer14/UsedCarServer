function get_car_obj(car) {
    return `<li class="list-group-item">
        <div class="row car" style="padding-top: 3%; padding-bottom: 3%;">
            <div class="col-4 imgDiv">
                <img class="car_image" src="${car.url}" alt="car_image" style="height: 85%; width: 85%;">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-8 infoDiv">
                        <p class="car_stock_num feature">Stock Number</p><p class="car_stock_num car_feature">${car.stock_num}</p>
                        <hr class="horizontal">
                        <p class="car_make feature">Make</p><p class="car_make car_feature">${car.make}</p>
                        <hr class="horizontal">
                        <p class="car_model feature">Model</p><p class="car_model car_feature">${car.model}</p>
                        <hr class="horizontal">
                        <p class="car_year feature">Year</p><p class="car_year car_feature">${car.year}</p>
                        <hr class="horizontal">
                        <p class="car_price feature">Price</p><p class="car_price car_feature">${car.price}</p>
                        <hr class="horizontal">
                    </div>
                    <div class="col-2 offset-2 d-flex justify-content-end buttonDiv" >
                        <input type="checkbox" class="check_box" value='${JSON.stringify(car)}' style="height: 50%; width: 50%;">
                    </div>
                <button class="btn btn-danger delete_btn" value='${JSON.stringify(car)}' style="width: 80%;">Delete</button>
                </div>
            <div>
        </div>
    </li>`
}

$.getJSON("/data/data10.json", () => {
    console.log("file loaded");
}).done((data) => {
    data.forEach((car) => {
        const car_div = get_car_obj(car);
        $('#car_list').append(car_div);
    });
    $.each($('.car'), function (idx) {
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    });

    $('.delete_btn').on('click', function () {
        const car = JSON.parse($(this).attr('value'));
        $.post('/delete-num', {
            "stock_num": car.stock_num, "make": car.make, "model": car.model, "year": car.year,
            "color": car.color, "url": car.url, "price": car.price
        })
            .done(() => {
                location.reload();
            })
    });

    $('form').on('submit', function () {
        if (isNaN(parseInt(this[0].value)) || this[0].value.length !== 8) {
            document.getElementById('alert_message').innerText +=
                "Must enter enter a valid eight digit number; "
        }
        if (this[1].value === "") {
            document.getElementById('alert_message').innerText +=
                "Must enter a car maker; "
        }
        if (this[2].value === "") {
            document.getElementById('alert_message').innerText +=
                "Must enter a car model; "
        }
        if (this[3].value === "" || isNaN(this[3].value) || this[3].value.length !== 4) {
            document.getElementById('alert_message').innerText +=
                "Must enter a valid year; "
        }
        if (isNaN(this[4].value)) {
            document.getElementById('alert_message').innerText +=
                "Must select a color; "
        }
        if (this[5].value === "") {
            document.getElementById('alert_message').innerText +=
                "Must enter a url; "
        }
        if (this[6].value === "" || isNaN(this[6].value)) {
            document.getElementById('alert_message').innerText +=
                "Must enter a price number; "
        }

        return document.getElementById('alert_message').innerText.length === 0;
    });

    $('.check_box').on('click', function () {
        if (this.checked) {
            const car = JSON.parse($(this).attr('value'));
            $.post('/checked_list', {
                "stock_num": car.stock_num, "make": car.make, "model": car.model, "year": car.year,
                "color": car.color, "url": car.url, "price": car.price
            })
        }else{
            const car = JSON.parse($(this).attr('value'));
            $.post('/unchecked_list', {
                "stock_num": car.stock_num, "make": car.make, "model": car.model, "year": car.year,
                "color": car.color, "url": car.url, "price": car.price
            })
        }
    });

    $('#delete_all').on('click', function () {
        $.post('/delete-selected').done(() => {
            location.reload();
        })
    })
});






