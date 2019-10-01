// Таймер
let sec = 0;
let min = 0;
let hour = 0;
$("#sec").val(sec);
$("#min").val(min);
$("#hour").val(hour);

time = function() {
    if (hour == 23 && min == 59 && sec == 59) {
        sec = 0;
        $("#sec").val(sec);
        min = 0;
        $("#min").val(min);
        hour = 0;
        $("#hour").val(hour);
    } else if (min == 59 && sec == 59) {
        hour++;
            $("#hour").val(hour);
            sec = 0;
            $("#sec").val(sec);
            min = 0;
            $("#min").val(min);
    } else if (sec == 59) {
        sec = 0;
        $("#sec").val(sec);
        min++;
        $("#min").val(min);
    } else {
        sec++;
        $("#sec").val(sec);
    }
}
timeID = null;

// Смайлик
clickSmile = function() {
    $("#smile").removeClass("fuhSmile");
    $("#smile").addClass("inGameSmile");
}

$("<table></table>").appendTo("div#game");

// Рандомайзер случайного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

game = function () {
    pole();
    play();
    step++
};

// Создаём поле
let pole = function () {
    $("#smile").addClass("inGameSmile");
    $("table").empty(); 
    width = parseInt($("#width").val());
    height = parseInt($("#height").val());

    for (let i = 0; i < height; i++) {
        $("<tr></tr>").appendTo("table");
    }
    for (let i = 0; i < width; i++) {
        $("<td></td>").appendTo("tr");
    }
    area = width * height;

    $("<button></button>").appendTo("td");

    // Присваиваем id номера к каждой клетке поля
    button = $("button");
    for (let i = 0; i < area; i++) {
        $(button[i]).attr("id", i);
        $(button).attr("disabled", true);
    }

    $("td").addClass("fone");
    
    td = $("td");
}

//Выставляем мины и цифры вокруг мин
let placement = function (btn) {
    let countMine = parseInt($("#countMine").val());
    //Выставляем мины
    for (let i = 0; i < countMine; i++) {
        let x = getRandomInt(0, area);
        // Проверка на то, что нажатая игроком клетка и все клетки вокруг не имеет мину 
        if (!$(td[x]).hasClass("mine") && x !== btn && x !== btn-width-1 && x !== btn-width &&
        x !== btn-width+1 && x !== btn-1 && x !== btn+1 &&
        x !== btn+width-1 && x !== btn+width && x !== btn+width+1) {
            let mine = td.get(x);
            $(mine).addClass("mine");
        } else {
            while ($(td[x]).hasClass("mine") || x == btn || x == btn-width-1 || x == btn-width ||
            x == btn-width+1 || x == btn-1 || x == btn+1 ||
            x == btn+width-1 || x == btn+width || x == btn+width+1) {
                x = getRandomInt(0, area);
            }
            let mine = td.get(x);
            $(mine).addClass("mine");
        }
        
    }
    //Проверям наличие мин вокруг пустой клетки и записываем их количество в count
    let count = 0;
    let checkCell = function(a) {
        if($(td[a-width-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a-width]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a-width+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a+width-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a+width]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        if($(td[a+width+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width!==0 && (a+1)%width!==0){
            count++;
        }
        
        
        if($(td[a-width]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width==0){
            count++;
        }
        if($(td[a-width+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width==0){
            count++;
        }
        if($(td[a+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width==0){
            count++;
        }
        if($(td[a+width]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width==0){
            count++;
        }
        if($(td[a+width+1]).hasClass("mine") && !$(td[a]).hasClass("mine") && a%width==0){
            count++;
        }
    
        if($(td[a-width-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && (a+1)%width==0){
            count++;
        }
        if($(td[a-width]).hasClass("mine") && !$(td[a]).hasClass("mine") && (a+1)%width==0){
            count++;
        }
        if($(td[a-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && (a+1)%width==0){
            count++;
        }
        if($(td[a+width-1]).hasClass("mine") && !$(td[a]).hasClass("mine") && (a+1)%width==0){
            count++;
        }
        if($(td[a+width]).hasClass("mine") && !$(td[a]).hasClass("mine") && (a+1)%width==0){
            count++;
        }
    }
    //Записываем в пустую клетку значение count, если count = 0 помечаем что клетка пустая
    for (let i = 0; i < area; i++) {
        checkCell(i);
        if (!$(td[i]).hasClass("mine") && count !== 0) {
            $(td[i]).prepend(count);
            $(td[i]).addClass("nbr");
        } else if (!$(td[i]).hasClass("mine") && count == 0) {
            $(td[i]).addClass("zero");
        }
        count = 0;
    }
}

// Уровень сложности игры
let easy = 1;
let medium = 2;
let hard = 3;
let custom = 4;

let selectionLevel = function (level) {
    
    // Устанавливаем значения ширины, высоты и количества мин относительно выбранному игроком уровню сложности
    if (level == easy) {
        $("#width").val(9);
        $("#width").attr("disabled", true);
        $("#height").val(9);
        $("#height").attr("disabled", true);
        $("#countMine").val(10);
        $("#countMine").attr("disabled", true);
    } else if (level == medium) {
        $("#width").val(16);
        $("#width").attr("disabled", true);
        $("#height").val(16);
        $("#height").attr("disabled", true);
        $("#countMine").val(40);
        $("#countMine").attr("disabled", true);
    } else if (level == hard) {
        $("#width").val(16);
        $("#width").attr("disabled", true);
        $("#height").val(30);
        $("#height").attr("disabled", true);
        $("#countMine").val(99);
        $("#countMine").attr("disabled", true);
    } else if (level == custom) {
        $("#width").val(9);
        $("#width").attr("disabled", false);
        $("#height").val(9);
        $("#height").attr("disabled", false);
        $("#countMine").val(10);
        $("#countMine").attr("disabled", false);
    }
}

// Записываем в level текущее выбранное игроком значение сложности
$(document).on("change","#level", function(){
    let level = $(this).val();
    selectionLevel(level);
});

selectionLevel(level);

//Запуск игры при нажатии на клавишу "Начать игру"
$("#start").on("click", function() {
    $("#step").val(0);
    $("#leftMin").val($("#countMine").val());

    let width = parseInt($("#width").val());
    level = parseInt($("#level").val());
    let height = parseInt($("#height").val());
    let countMine = parseInt($("#countMine").val());
    // Уловие запуска custom режима (минимальный размер поля 9 на 9, максимальный 20 на 40, 
    // максимальное количество мин ровно количеству клеток на поле без 9)
    if (level == custom && 9 <= width && width <= 20 && 9 <= height && height <= 40) {
        if (10 <= countMine && countMine <= width * height - 9) {
            $(game);
            $(button).removeAttr("disabled");
            clearInterval(timeID);

            timeID = null;
            timeID = setInterval(time, 1000);
            sec = 59;
            min = 59;
            hour = 23;
            
            $("#smile").removeClass();
            $("#smile").addClass("inGameSmile");
        } else {
            $("#countMine").val(10);
            $(game);
            $(button).removeAttr("disabled");
            clearInterval(timeID);

            timeID = null;
            timeID = setInterval(time, 1000);
            sec = 59;
            min = 59;
            hour = 23;
            
            $("#smile").removeClass();
            $("#smile").addClass("inGameSmile");
        }
    // При выборе количества клеток меньше или больше допустимого устанавливается размер поля 9 на 9
    } else if (level == custom) {
        $("#width").val(9);
        $("#height").val(9);
        $(game);
        $(button).removeAttr("disabled");
        clearInterval(timeID);

        timeID = null;
        timeID = setInterval(time, 1000);
        sec = 59;
        min = 59;
        hour = 23;
        
        $("#smile").removeClass();
        $("#smile").addClass("inGameSmile");
    } else {
        $(game);
        $(button).removeAttr("disabled");
        clearInterval(timeID);

        timeID = null;
        timeID = setInterval(time, 1000);
        sec = 59;
        min = 59;
        hour = 23;
        
        $("#smile").removeClass();
        $("#smile").addClass("inGameSmile");
    }
    
});

// Процесс игры
let width = parseInt($("#width").val());
let height = $("#height").val();
let button = $("button");
let play = function () {
// Отображение цифр
    showNbr = function(x) {
        // Проверка на столбец не первый и не последний
        if((x+1)%width!==0 && x%width!==0){
            if($(td[x-width-1]).hasClass("nbr") && !$(td[x-width-1]).hasClass("flag")){
                $("button",(td[x-width-1])).remove();
            } else if($(td[x-width-1]).hasClass("zero")) {
                $(td[x-width-1]).removeClass("zero");
                $(td[x-width-1]).addClass("zero+");
            }

            if($(td[x-width+1]).hasClass("nbr") && !$(td[x-width+1]).hasClass("flag")){
                $("button",(td[x-width+1])).remove();
            } else if($(td[x-width+1]).hasClass("zero")) {
                $(td[x-width+1]).removeClass("zero");
                $(td[x-width+1]).addClass("zero+");
            }

            if($(td[x+width-1]).hasClass("nbr") && !$(td[x+width-1]).hasClass("flag")){
                $("button",(td[x+width-1])).remove();
            } else if($(td[x+width-1]).hasClass("zero")) {
                $(td[x+width-1]).removeClass("zero");
                $(td[x+width-1]).addClass("zero+");
            }

            if($(td[x+width+1]).hasClass("nbr") && !$(td[x+width+1]).hasClass("flag")){
                $("button",(td[x+width+1])).remove();
            } else if($(td[x+width+1]).hasClass("zero")) {
                $(td[x+width+1]).removeClass("zero");
                $(td[x+width+1]).addClass("zero+");
            }

            

            if($(td[x-width]).hasClass("nbr") && !$(td[x-width]).hasClass("flag")){
                $("button",(td[x-width])).remove();
            } else if($(td[x-width]).hasClass("zero")) {
                $(td[x-width]).removeClass("zero");
                $(td[x-width]).addClass("zero+");
            }

            if($(td[x+1]).hasClass("nbr") && !$(td[x+1]).hasClass("flag")){
                $("button",(td[x+1])).remove();
            } else if($(td[x+1]).hasClass("zero")) {
                $(td[x+1]).removeClass("zero");
                $(td[x+1]).addClass("zero+");
            }

            if($(td[x-1]).hasClass("nbr") && !$(td[x-1]).hasClass("flag")){
                $("button",(td[x-1])).remove();
            } else if($(td[x-1]).hasClass("zero")) {
                $(td[x-1]).removeClass("zero");
                $(td[x-1]).addClass("zero+");
            }

            if($(td[x+width]).hasClass("nbr") && !$(td[x+width]).hasClass("flag")){
                $("button",(td[x+width])).remove();
            } else if($(td[x+width]).hasClass("zero")) {
                $(td[x+width]).removeClass("zero");
                $(td[x+width]).addClass("zero+");
            }

        // Проверка на первый столбец
        } else if(x%width==0) {
            if($(td[x-width+1]).hasClass("nbr") && !$(td[x-width+1]).hasClass("flag")){
                $("button",(td[x-width+1])).remove();
            } else if($(td[x-width+1]).hasClass("zero")) {
                $(td[x-width+1]).removeClass("zero");
                $(td[x-width+1]).addClass("zero+");
            }

            if($(td[x+width+1]).hasClass("nbr") && !$(td[x+width+1]).hasClass("flag")){
                $("button",(td[x+width+1])).remove();
            } else if($(td[x+width+1]).hasClass("zero")) {
                $(td[x+width+1]).removeClass("zero");
                $(td[x+width+1]).addClass("zero+");
            }

            if($(td[x-width]).hasClass("nbr") && !$(td[x-width]).hasClass("flag")){
                $("button",(td[x-width])).remove();
            } else if($(td[x-width]).hasClass("zero")) {
                $(td[x-width]).removeClass("zero");
                $(td[x-width]).addClass("zero+");
            }

            if($(td[x+1]).hasClass("nbr") && !$(td[x+1]).hasClass("flag")){
                $("button",(td[x+1])).remove();
            } else if($(td[x+1]).hasClass("zero")) {
                $(td[x+1]).removeClass("zero");
                $(td[x+1]).addClass("zero+");
            }

            if($(td[x+width]).hasClass("nbr") && !$(td[x+width]).hasClass("flag")){
                $("button",(td[x+width])).remove();
            } else if($(td[x+width]).hasClass("zero")) {
                $(td[x+width]).removeClass("zero");
                $(td[x+width]).addClass("zero+");
            }
        // Проверка на последний столбец
        } else if((x+1)%width==0) {
            
            if($(td[x+width-1]).hasClass("nbr") && !$(td[x+width-1]).hasClass("flag")){
                $("button",(td[x+width-1])).remove();
            } else if($(td[x+width-1]).hasClass("zero")) {
                $(td[x+width-1]).removeClass("zero");
                $(td[x+width-1]).addClass("zero+");
            }

            if($(td[x-width-1]).hasClass("nbr") && !$(td[x-width-1]).hasClass("flag")){
                $("button",(td[x-width-1])).remove();
            } else if($(td[x-width-1]).hasClass("zero")) {
                $(td[x-width-1]).removeClass("zero");
                $(td[x-width-1]).addClass("zero+");
            }

            if($(td[x-width]).hasClass("nbr") && !$(td[x-width]).hasClass("flag")){
                $("button",(td[x-width])).remove();
            } else if($(td[x-width]).hasClass("zero")) {
                $(td[x-width]).removeClass("zero");
                $(td[x-width]).addClass("zero+");
            }

            if($(td[x-1]).hasClass("nbr") && !$(td[x-1]).hasClass("flag")){
                $("button",(td[x-1])).remove();
            } else if($(td[x-1]).hasClass("zero")) {
                $(td[x-1]).removeClass("zero");
                $(td[x-1]).addClass("zero+");
            }

            if($(td[x+width]).hasClass("nbr") && !$(td[x+width]).hasClass("flag")){
                $("button",(td[x+width])).remove();
            } else if($(td[x+width]).hasClass("zero")) {
                $(td[x+width]).removeClass("zero"); 
                $(td[x+width]).addClass("zero+");
            }
        }
        $(shagTd);
        
    }
// После клика по пустой кнопке открывает вокруг неё другие пустые и клетки с цифрами
    shagTd = function() {
        for (let i = 0; i < td.length; i++) {
            
            if($(td[i]).hasClass("zero+") && !$(td[i]).hasClass("flag")) {
                
                $(td[i]).empty(); 
                $(td[i]).removeClass("zero+");
                $(showNbr(i));
            }

            
        }
    }
// Функция нажатия на клетку поле
    let stepReal = 0;
    let countFlag = 0;
    let step = 0;
    let countOpenCell = 0;

    $("button").on("click", function() {
        //Проверяем установлен ли на ней флаг
        if (!$(this).hasClass("flag")) {
            buttonClick = $(this);
            btnClick = parseInt($(buttonClick).attr("id"));
            // Проверяем первый ли это ход, если да, то запускаем функцию расстановки мин и цифр
            if (stepReal == 0) {
                placement(btnClick);
            }
            btnClick = $(buttonClick).attr("id");
            // Проверка на нажали ли на мину
            if($(td[btnClick]).hasClass("mine")) {
                $("#smile").removeClass("inGameSmile");
                $("#smile").addClass("mineSmile");
                $(buttonClick).remove("button");
                clearInterval(timeID);
                timeID = null;
                $(td[btnClick]).css("background-color", "red");
                $(".mine").children("button").remove();
                $(button).attr("disabled", true);
            } else {
                $("#smile").removeClass("inGameSmile");
                $("#smile").addClass("fuhSmile");
                setTimeout(clickSmile, 200);
                $(td[btnClick]).children("button").remove();
                // Если пустая клетка то запускаем функцию открытия соседних пустых вместе с цифрами
                if($(td[btnClick]).hasClass("zero")) {
                    showNbr(parseInt(btnClick));
                }

                win();
                step++;
                stepReal++;
            $("#step").val(step);
            }
        }
        
        
        
    });

    // Проверка на победу
    countMF = 0;
    let win = function() {
    // Проверяем каждую ячейку на наличие мины и на не открытость
    for (let i = 0; i < td.length; i++) {
        // Смотрим колличество не открытых ячеек
        if($(td[i]).children("button").length > 0) {
            countOpenCell++;
        }
        // Увеличиваем счётчик countMF если на клетке есть и флаг и мина
        if ($(td[i]).hasClass("mine") && $(td[i]).hasClass("flag")) {
            countMF++;
            // Побеждаем если колличество клеток с минами и фланами будет равно колличеству мин
            if (countMF == $("#countMine").val()) {
                $("#smile").removeClass("inGameSmile");
                $("#smile").addClass("winSmile");
                clearInterval(timeID);
                timeID = null;
                $(button).attr("disabled", true);
            }
    
        }
    } 
    // Побеждаем если количесвто не открытых клеток равно количеству мин
    if (countOpenCell  ==  $("#countMine").val()){
        $("#smile").removeClass("inGameSmile");
        $("#smile").addClass("winSmile");
        clearInterval(timeID);
        timeID = null;
        $(button).attr("disabled", true);
    } 
    countOpenCell = 0;
    countMF = 0;
    }
    
    // Функция установки/отмены флага
    let leftMin = $("#countMine").val()
    $("button").on("contextmenu", function() {
        // Убераем флаг если клетка имеет флаг
        if ($(this).hasClass("flag")) {
            $(this).removeClass("flag");
            $(this).parent().removeClass("flag");
            step--;
            $("#step").val(step);
            countFlag--;
            leftMin = $("#countMine").val() - countFlag;
            $("#leftMin").val(leftMin);
        // Устанавливаем флаг есть клетка не имеет флаг
        } else if (leftMin != 0) {
            buttonClick = $(this);
            btnClick = parseInt($(buttonClick).attr("id"));
            $(this).addClass("flag");
            $(this).parent().addClass("flag");
            countFlag++;
            step++;
            
            $("#step").val(step);
            leftMin = $("#countMine").val() - countFlag;
            $("#leftMin").val(leftMin);
            win();
        }
        return false; 
    });
}
$(game);