// @prepros-prepend carousel.js
// @prepros-prepend popup.js

var navText = [
  '<svg class="icon"><use xlink:href="assets/img/sprite.svg?#ap"></use></svg>',
  '<svg class="icon"><use xlink:href="assets/img/sprite.svg?#an"></use></svg>',
];

$("a.disabled").click(function (e) {
  e.preventDefault();
  return false;
});

(function () {
  var prevScrollpos = window.pageYOffset;
  var navbar = document.querySelector(".header");

  if (navbar) {
    prevScrollpos == 0
      ? (navbar.style.top = "0")
      : (navbar.style.top = "-200px");

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      prevScrollpos > currentScrollPos
        ? (navbar.style.top = "0")
        : (navbar.style.top = "-200px");
      prevScrollpos = currentScrollPos;
    };
  }

  $(".header .toggle").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".header__content").removeClass("show");
    } else {
      $(this).addClass("active");
      $(".header__content").addClass("show");
    }
  });

  $(".header .toggle").blur(function () {
    if ($(this).hasClass("active")) {
      setTimeout(() => {
        $(this).removeClass("active");
        $(".header__content").removeClass("show");
      }, 250);
    }
  });

  $('[data-show="popup"]').magnificPopup({ type: "inline" });

  $("[data-large]").magnificPopup({
    type: "image",
    image: {
      titleSrc: function (item) {
        return (
          item.el.data("name") + "<small>" + item.el.data("small") + "</small>"
        );
      },
    },
    zoom: { enabled: true },
    callbacks: {
      elementParse: function (item) {
        item.src = item.el.data("large");
      },
    },
  });

  $("[data-cabinet]").magnificPopup({
    type: "image",
    gallery: { enabled: true, tCounter: "" },
    image: {
      tError: '<a href="%url%">Фото #%curr%</a> не загружено.',
      titleSrc: function (item) {
        return (
          item.el.data("name") + "<small>" + item.el.data("small") + "</small>"
        );
      },
    },
    zoom: { enabled: true },
    callbacks: {
      elementParse: function (item) {
        item.src = item.el.data("cabinet");
      },
    },
  });

  $("[data-master]").magnificPopup({
    type: "image",
    gallery: { enabled: true, tCounter: "" },
    image: {
      tError: '<a href="%url%">Фото #%curr%</a> не загружено.',
      titleSrc: function (item) {
        return (
          item.el.data("name") + "<small>" + item.el.data("small") + "</small>"
        );
      },
    },
    zoom: { enabled: true },
    callbacks: {
      elementParse: function (item) {
        item.src = item.el.data("master");
      },
    },
  });

  $("#gallery").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: { enabled: true, tCounter: "" },
    image: {
      tError: '<a href="%url%">Фото #%curr%</a> не загружено.',
      titleSrc: function (item) {
        return (
          item.el.data("name") + "<small>" + item.el.data("small") + "</small>"
        );
      },
    },
    zoom: { enabled: true },
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  $(".wellcome__carousel").owlCarousel({
    items: 1,
    margin: 50,
    smartSpeed: 700,
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText,
  });

  $(".booking__table table tbody td").hover(function () {
    var idx = $(this)[0].cellIndex;

    $(".booking__table table thead td").each(function (index, item) {
      if (item.cellIndex === idx) {
        $(item).addClass("active");
      } else {
        $(item).removeClass("active");
      }
    });
  });

  var mapStyle = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [{ saturation: "-70" }],
    },
  ];
  var mapContainer = document.querySelector("#map");
  var map_location = [55.821588, 37.494875];
  var contentString = `
              <div id="content">
                <div id="bodyContent">
                  <img src="assets/img/logo.png", alt=$project />
                  <p>Москва, Ленинградское шоссе, д.17/1<br><b>Тел.:</b> +7 (985) 068 11 39<br><b>e-Mail:</b> info@tantrium.ru</p>
                </div>
              </div>
            `;

  if (mapContainer) {
    var map = new google.maps.Map(mapContainer, {
      zoom: 19,
      center: new google.maps.LatLng(map_location[0], map_location[1]),
      disableDefaultUI: true,
      styles: mapStyle,
    });

    var map_marker = new google.maps.Marker({
      position: new google.maps.LatLng(map_location[0], map_location[1]),
      map: map,
      icon: {
        url: "assets/img/marker.png",
        scaledSize: new google.maps.Size(41, 48),
      },
    });

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    map_marker.addListener("click", function () {
      infowindow.open(map, map_marker);
    });

    window.addEventListener("resize", function () {
      window.setTimeout(function () {
        map.panTo(map_marker.getPosition());
      }, 250);
    });
  }
})();
