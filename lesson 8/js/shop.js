/**
 * Created by Alex Pryakhin on 05.12.2017.
 */
$(document).ready(function () {
	initBasketBlock();
    initCatalogBlock();
	
	$("body").on("click", ".product-buy", function(){ onBuyButtonClick(this) });
});

function initBasketBlock(){
    // хардкод для тестирования
    var userId = 1;
	
	$("#basket").empty();
	$("#basket").append("<p>Обновление...</p>");
	setTimeout(function(){
		getBasketByUserId(userId);
	}, 1000);
}

function initCatalogBlock(){
    $.ajax({
        url: "static/catalogData.json",
        method: "GET",
        dataType: "json",
        success: function(answer){
            insertCatalogItemsOnPage(answer);
        },
        error: function(answer){
            printErrorMessage(answer);
        }
    });
}

function onBuyButtonClick(eventButton){
	$.ajax({
        url: "static/addToBasket.json",
        method: "GET",
        data: {
            user_id: 1,
			product_id: eventButton.value
        },
        dataType: "json",
        success: function(answer){
			if(answer.result == 1){
				initBasketBlock();
			}
			else{
				printErrorMessage("Ошибка добавления товара в корзину");
			}
		},
        error: function(answer){
            printErrorMessage(answer);
        }
    });
}

function getBasketByUserId(userId){
    $.ajax({
        url: "static/getBasket.json",
        method: "GET",
        data: {
            user_id: userId
        },
        dataType: "json",
        success: function(answer){
            var html = "<div>";
            html += "<p>Товаров в корзине: " + answer.countGoods + "</p>";
            html += "<p>Стоимость: " + answer.amount + "</p>";
            html += "<p><a href='/basket.html'>К корзине</a></p>";
			html += "</div>"

            $("#basket").empty().append(html);
        },
        error: function(answer){
            printErrorMessage(answer);
        }
    });
}

function printErrorMessage(answer) {
    console.log(answer);
}

function insertCatalogItemsOnPage(catalogData){
    $.each(catalogData, function(key, item){
        var product = "<div class='catalog-item'>";
        product += "<h4 class='product-name'>" + item.product_name + "</h4>";
        product += "<p class='product-price'>" + item.product_name + "</p>";
        product += "<button class='product-buy' value='" + item.id_product + "'>Купить</button>";
		product += "</div>";

        $("#catalog").append(product);
    });
}