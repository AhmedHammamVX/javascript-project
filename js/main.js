

/***************** onload shop page *****************/
async function filterChange() {
        const response = await fetch('json/json.json');
        data = await response.json();
    var checkedFilter = [];
        var d = document.querySelectorAll('input[type="checkbox"]:checked');
    d.forEach((e) => {
        checkedFilter.push((e.getAttribute("id")));
    });

    if (checkedFilter.includes("price-all")) {
        buildProducts(data);

    } else {
        var filterResult = new Set();
        var priceFilter = [];
            if (checkedFilter.includes("price-1"))
                priceFilter.push(100);
            if (checkedFilter.includes("price-2"))
                priceFilter.push(200);
            if (checkedFilter.includes("price-3"))
                priceFilter.push(300);
            if (checkedFilter.includes("price-4"))
                priceFilter.push(400);
            if (checkedFilter.includes("price-5"))
                priceFilter.push(500);
        
        for (const item of data) {
            for (var i = 0; i < priceFilter.length; i++) {
            if (item.price > priceFilter[i] - 100 && item.price < priceFilter[i])
                filterResult.add(item);
        }
        buildProducts(filterResult);
        }
    }

}

function buildProducts(arr) {
  document.getElementById("shopProducts").innerHTML = "";
    for (const item of arr) {
        var currentElement= document.getElementById("shopProducts").innerHTML +=
            `
                <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src=${item.pictureLink} alt="">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">${item.pName}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>$${item.price}</h5><h6 class="text-muted ml-2"><del>$${item.price}</del></h6>
                        </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                        </div>
                    </div>
                </div>
            `;
    }
}


/***************** logout function *****************/
function logout() {
    localStorage.removeItem("currentUser");
    location.href = "SignIn.html";
}

/***************** onload function *****************/
function onLoadAuth() {
    filterChange();
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser != null) {
        var lastName = currentUser.lastName;
        document.getElementById("homeWelcome").innerHTML += "<div class='btn px-0 ml-3'><p class='text-white' style='display:inline-block; justify-content:center;'>Welcome " + lastName + "</p></div>";
        document.getElementById("accountMenu1").textContent = "Profile";
        document.getElementById("accountMenu2").textContent = "Logout";
        document.getElementById("accountMenu1").setAttribute("onclick", "");
        document.getElementById("accountMenu2").setAttribute("onclick", "logout()");
    } else {
        document.getElementById("accountMenu1").setAttribute("onclick", '(function(){location.href="SignIn.html";})();');
        document.getElementById("accountMenu2").setAttribute("onclick", '(function(){location.href="SignUp.html";})();');
    }
}


(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        console.log("from main js");
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);


