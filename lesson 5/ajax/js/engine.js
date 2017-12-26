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

function Menu(my_id, my_class, my_items){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   
   this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(){
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
	
	for(var item in this.items){
		if(this.items[item] instanceof MenuItem){
			result += this.items[item].render();
		}
	}
	
	result += "</ul>";
	
	return result;
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

function fillMenuContents(xhr){
	var m_items = {};
	if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var items = JSON.parse(xhr.responseText);
				for(var i = 0; i < items.menu_items.length; i++){
					m_items[i] = new MenuItem(items.menu_items[i].href, items.menu_items[i].title);
				}
            } else {
                alert('Ошибка выполнения запроса.');
            }
        }

	var menu = new Menu("my_menu", "My_class", m_items);
	var div = document.write(menu.render());
}

var xhr = false;
if (window.XMLHttpRequest) { 
    xhr = new XMLHttpRequest();
    if (xhr.overrideMimeType) 
        xhr.overrideMimeType('text/xml');
    else if (window.ActiveXObject) { 
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
	}
}

if (!xhr) {
    alert('Ошибка : невозможно создать запрос');
}
    
var m_items;
xhr.onreadystatechange = function() { fillMenuContents(xhr); };
xhr.ontimeout = function(){ alert('Превышено время ожидания запроса'); };
xhr.open('GET', 'menu.json', true);
xhr.send(null);