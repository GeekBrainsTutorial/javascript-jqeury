$(document).ready(function(){
	var menu = new Menu('my_class', 'my_menu');
	menu.render("append");
	
	$('.hide_menu').on('click', function(){
		$('.hide_menu + ul').toggle("slow");
	});
});

/*
* описания классов
*/
function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Menu(my_id, my_class){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   
   this.items = [];
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(receptor){
	$.get({
		url: 'menu.json',
		dataType : "json",
		success: function(answer){
			var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
			
			var menu_items = [];			
			
			for(var i = 0; i < answer.menu_items.length; i++){
				menu_items[i] = new MenuItem(answer.menu_items[i].href, answer.menu_items[i].title);
			}
					
			for(var item in menu_items){
				if(menu_items[item] instanceof MenuItem){
					result += menu_items[item].render();console.log(result);
				}
			}
		
			result += "</ul>";
	
			$("#" + receptor).append(result);
		}
	});
	
	
}

function MenuItem(my_href, my_name){
   Container.call(this);
   this.className = "menu-item";
   this.href = my_href;
   this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	return "<li class='"+this.className+"' href='"+ this.href +"'>" + this.itemName + "</li>";
}
