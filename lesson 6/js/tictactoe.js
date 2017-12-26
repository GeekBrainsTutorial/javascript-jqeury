// кто ходит
// 0 - нолик, 1 - крестик
var phase = 1;

// результат игры храним в массиве
// -1 - пусто, 0 - нолик, 1 - крестик
var result = [
	[-1, -1, -1],
	[-1, -1, -1],
	[-1, -1, -1]
];

function init(){
	// загружаем игровое поле
	var field = generateField();
}

function generateField(){
	var field_div = document.getElementById("tictactoe");
	
	for(var i=0;i<3;i++){
		for(var j=0; j<3; j++){
			var cell = document.createElement("div");
			cell.setAttribute("class", "field_part row_"+i+" cell_"+j);
			cell.addEventListener("click", gameClickListener);
			field_div.append(cell);
		}
	}
}

function gameClickListener(cell_object){
	var cell = cell_object.target;
	
	var row_arr = cell.getAttribute("class").split(" ");
	var row_index = row_arr[1].split("_")[1];
	var cell_arr = cell.getAttribute("class").split(" ");
	var cell_index = row_arr[2].split("_")[1];
	
	// проверяем, есть ли что-то в ячейке
	if(result[row_index][cell_index] == -1){
		// обновляем игровую матрицу
		result[row_index][cell_index] = phase;
		
		var cell_content, next_phase;
		if(phase == 1){
			cell_content = "X";
			next_phase = "O"
			phase = 0;
		}
		else{
			cell_content = "O";
			next_phase = "X"
			phase = 1;
		}
		
		// помещаем символ
		cell.innerHTML = cell_content;
		
		// меняем текущего игрока
		var tictactoe_phase = document.getElementById("phase-name");
		tictactoe_phase.innerHTML = next_phase;
	}
	else{
		alert("Выберите другую ячейку!");
	}
	
	// при каждом ходе проверяем условие победы
	var win_condition = checkWinCondition();
	switch(win_condition){
		case -1:
			// Игра продолжается;
			break;
		case 0:
			alert("Ничья!");
			location.reload();
			break;
		case 1:
			alert("Победили крестики!");
			location.reload();
			break;
		case 2:
			alert("Победили нолики!");
			location.reload();
			break;
	}
}

function checkWinCondition(){
	// в ряду, столбце или диагонали будут одинаковые числа
	
	// -1 - игра не окончена; 0 - ничья; 1 - победили крестики; 2 - победили нолики
	// проверяем на победу
	var win;
	
	for(var i = 1; i < 3; i++){
        // По горизонтали
        if( (result[0][0] == i && result[1][0] == i && result[2][0] == i) ||
            (result[0][1] == i && result[1][1] == i && result[2][1] == i) ||
            (result[0][2] == i && result[1][2] == i && result[2][2] == i) ||

            // По вертикали
            (result[0][0] == i && result[0][1] == i && result[0][2] == i) ||
            (result[1][0] == i && result[1][1] == i && result[1][2] == i) ||
            (result[2][0] == i && result[2][1] == i && result[2][2] == i) ||

            // По диагонали
            (result[0][0] == i && result[1][1] == i && result[2][2] == i) ||
            (result[2][0] == i && result[1][1] == i && result[0][2] == i) )
		{
				win = i;
		}
    }        

    // Проверка на ничью
    var count = 0;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(result[i][j] != -1){
                count++;
			}
		}
	}

	// Заполнено все поле
    if(count == 9 && win == -1)
        win = 0;

	// Во всех остальных случаях
	if(win === undefined)
		win = -1;
	
	return win;
}

// стартуем
window.onload = init;