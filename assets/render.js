function changeimage() {
    var id = '';
    var nextindex = 0;
    var previousindex = 0;
  console.log(swiper);
    document.querySelectorAll("[name=id] option").forEach(function (option, index) {
        if (document.querySelector("[name=id]").value == option.getAttribute("value")) {
            id = option.getAttribute("data-id") != "" ? option.getAttribute("data-id") : 0;
            nextindex = index + 1;
            previousindex = index - 1;
        }
    })

    var nextid = document.querySelectorAll("[name=id] option")[nextindex]
        ? document.querySelectorAll("[name=id] option")[nextindex].getAttribute("data-id")
        : 0;

    var previousid = document.querySelectorAll("[name=id] option")[previousindex]
        ? document.querySelectorAll("[name=id] option")[previousindex].getAttribute("data-id")
        : 0;
    var hide = true;

 
    var length = document.querySelectorAll(".images-tabs-menu.w-tab-menu a").length;
    // if (id) {
    let selectColor = document.querySelector('select.ib-color').value.toLowerCase();
 let array_data = [];
        for (let index = 1; index <= length; index++) {
            document.querySelectorAll(".images-tabs-menu.w-tab-menu a").forEach(function (thumb) {
     
              let stringFile = thumb.getAttribute('jc-variant-id');
                    if (stringFile && stringFile.includes('#')) {
 
                  } else if (stringFile.includes(selectColor)) {
                         thumb.classList.remove("hide");
                       thumb.classList.add("show");
                      array_data.push(thumb.getAttribute('id'));
                    }else{
                       thumb.classList.add("hide");
                      thumb.classList.remove("show");
                    }
 
            });
   
        }
     let FirstElement = array_data[0];
      let NumberElement = FirstElement.replace("w-tabs-0-data-w-tab-",'');
        swiper.update();
   swiper.slideTo(NumberElement); 
    // }

    document.querySelectorAll(".show")[0].click();
}

function updatemaster() {
    var master = document.querySelectorAll("#product-select option");

    var selected = document.querySelectorAll(".single-option-selector");
    var variantname = '';

    for (let i = 0; i < selected.length; i++) {
        const element = selected[i].value;
        if (i == selected.length - 1) {
            variantname = variantname + element;
        }
        else {
            variantname = variantname + element + ' / ';
        }
    }

    var choosen = false;
    var available = false;
    var id = "";
    var price = "";
    for (let j = 0; j < master.length; j++) {
        const element = master[j].getAttribute("data-index");
        if (element == variantname) {
            id = master[j].getAttribute("value");
            document.querySelector("#product-select").value = id;
            price = master[j].getAttribute("data-price");
            var choosen = true;
            available = master[j].getAttribute("data-available");
        }
    }

    var availabletext = document.querySelector("#product-select").getAttribute("data-available-text");
    var soldouttext = document.querySelector("#product-select").getAttribute("data-solout-text");
    var unavailabletext = document.querySelector("#product-select").getAttribute("data-unavailable-text");

    if (choosen) {
        if (available == "true") {
            document.querySelector(".add-cart-submit-btn").value = availabletext;
            document.querySelector(".add-cart-submit-btn").removeAttribute("disabled");
        }
        else if (available == "false") {
            document.querySelector(".add-cart-submit-btn").value = soldouttext;
            document.querySelector(".add-cart-submit-btn").setAttribute("disabled", "disabled");
        }
    }
    else {
        document.querySelector(".add-cart-submit-btn").value = unavailabletext;
        document.querySelector(".add-cart-submit-btn").setAttribute("disabled", "disabled")
    }

    var nextURL = window.location.pathname + "?variant=" + id;
    window.history.replaceState("", "", nextURL);
    changeimage()
}


document.querySelectorAll(".single-option-selector").forEach(function (select) {
    select.addEventListener("change", function () {
        updatemaster();
    })
})
jQuery( document ).ready(function() {
  setTimeout(function() {
    changeimage();
  },1000);

});
function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
}