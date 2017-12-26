/**
 * Created by Alex Pryakhin on 05.12.2017.
 */
$(document).ready(function () {
    initBasketPage();
	
	$("body").on("click", ".product-del", function(){ onDeleteButtonClick(this) });
});


function initBasketPage(){	
	$("#basket").empty();
	$("#basket").append("<p>Обновление...</p>");
	setTimeout(function(){
		getBasketByUserId(userId);
	}, 1000);
	
	$.ajax({
        url: "static/getBasket.json",
        method: "GET",
        dataType: "json",
        success: function(answer){
            $.each(catalogData, function(key, item){
				var product = "<div class='catalog-item'>";
				product += "<h4 class='product-name'>" + item.product_name + "</h4>";
				product += "<p class='product-price'>" + item.product_name + "</p>";
				product += "<button class='product-del' value='" + item.id_product + "'>Удалить из корзины</button>";
				product += "</div>";

				$("#content").append(product);
			});
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

function onDeleteButtonClick(deleteButton){
	$.ajax({
        url: "static/deleteFromBasket.json",
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
				printErrorMessage("Ошибка удаления товара из корзины");
			}
		},
        error: function(answer){
            printErrorMessage(answer);
        }
    });
}