"use strict"
const fragesatz = document.getElementById("fragebereich");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("fragenummer");
const hi = document.getElementById("bereich");

class Quiz
{
    constructor( questions, results)
    {
        //Массив с вопросами
        this.questions = questions;
        //Массив с возможными результатами
        this.Niveau = results;
        //Количество набранных очков
        this.score = 0;
        //Номер результата из массива
        this.meinNiveau = 0;
        //Номер текущего вопроса
        this.fragenummer = 0;
    }

    Click(index)
    {
        //Добавляем очки
        let value = (this.questions[this.fragenummer].answers[index].value/this.questions.length)*100;
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if(value == 1)
        {
            correct = index;
        }
        else
        {
            //Иначе ищем, какой ответ может быть правильным
            for(let i = 0; i < this.questions[this.fragenummer].answers.length; i++)
            {
                if(this.questions[this.fragenummer].answers[i].value == 1)
                {
                    correct = i;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next()
    {
        this.fragenummer++;

        if(this.fragenummer >= this.questions.length)
        {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End()
    {
        for(let i = 0; i < this.Niveau.length; i++)
        {
            if(this.Niveau[i].Check(this.score))
            {
                this.meinNiveau = i;
            }
        }
    }
}



//Класс, представляющий результат
class Result
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value)
    {
        if(this.value <= value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

//Массив с результатами
const results =
    [
        new Result("Sie müssen noch viel lernen", 0),
        new Result("Sie sind schon ziemlich gut.", 25),
        new Result("Sie sind überdurchschnittlich schlau", 50),
        new Result("Sie kennen das Thema perfekt.", 75)
    ];

//Обновление теста
function Update()
{
    //Проверяем, есть ли ещё вопросы

    if(quiz.fragenummer < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке
        fragesatz.innerHTML = quiz.questions[quiz.fragenummer].text;
    if(quiz.questions==mathefragen)
    katex.render(quiz.questions[quiz.fragenummer].text, fragesatz, {
    throwOnError: false
        });
        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";
        shuffle(quiz.questions[quiz.fragenummer].answers);
        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.fragenummer].answers.length; i++)
        {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.fragenummer].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.fragenummer + 1) + " / " + quiz.questions.length;
        document.getElementById('progress').style.width=Math.round(quiz.score)+"%";
///////        document.getElementById('progress').style.width=(quiz.score/(quiz.questions.length))*100+"%";
        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
    else
    {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        fragesatz.innerHTML = quiz.Niveau[quiz.meinNiveau].text;
        pagesElem.innerHTML = "Punkten: " + Math.round(quiz.score);
        document.getElementById('progress').style.width=Math.round(quiz.score)+"%";
        let btn = document.createElement("button");
        btn.className = "button";
        btn.innerHTML ="Noch mal";
        buttonsElem.appendChild(btn);
        btn.onclick=function() { // перезапишет существующий обработчик

            quiz = new Quiz(questions, results);
            Update();
        }
    }
}

function Init()
{
    //Находим все кнопки
    let btns = document.querySelectorAll("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
     btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index)
{
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);
//let correct = fragen[index].value;
    //Находим все кнопки
    let btns = document.querySelectorAll("button");

    //Делаем кнопки серыми
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным

        if(correct >= 0)
        {
            btns[correct].className = "button button_correct";
        }

        if(index != correct)
        {
            btns[index].className = "button button_wrong";
        }
    //Ждём секунду и обновляем тест
    setTimeout(Update, 1000);
}

const mathefragen =
    [
//1
        {
            text:  "2 + 2 = ",
            answers: [ {text:"1",value:0},{text:"3",value:0},{text: "4",value: 1},{text: "0",value: 0}]

        },
//2
        {
            text:  "10(x-9)=-10",
            answers: [ {text:"39",value:0},{text:"21",value:0},{text: "8",value: 1},{text: "6",value: 0}]

        },

//3
        {
            text:  "\\textit{Welche von der vier  Trigonometrie-Formeln ist falsch geschrieben?} \\\\ 1.) \\tg{x}\\ctg{x}=1 \\\\2.) \\sin^2x + \\cos^2x = 1  \\\\3.) \\tg^2{x}={\\sin{x} \\over \\cos{x} }\\\\4.) \\sin{3x}=3\\sin{x}-4\\sin^3{x} ",
            answers: [ {text:"1",value:0},{text:"2",value:0},{text: "3",value: 1},{text: "4",value: 0}]

        },
  //4
        {
            text:  "\\textit{ Berechnen Sie den Grenzwert}\\\\ \\\\ \\lim\\limits_{x\\to\\infty } ({4x+7 \\over 2x+3})^{4-x}",
            answers: [ {text:"+ ∞",value:1},{text:"8e",value:0},{text: "0",value: 0},{text: "1",value: 0}]

        },
//5
        {
            text:  "\A=\\begin{pmatrix} 3 & -1 \\\\ 4 & 2 \\end{pmatrix}, \B=\\begin{pmatrix} 3 & 4 \\\\ 1 & 3 \\end{pmatrix} \\textit{,dann } \\\\ \\\\ \\textit{Determinante } (\A^{-1} * \B)^{-2}=",
            answers: [ {text:"-0.5",value:0},{text:"4",value:0},{text: "-4",value: 1},{text: "0.5",value: 0}]

        },
//6
    {
        text:  `2 * 10^{-3} =`,
        answers: [ {text:"0,002",value:1},{text:"0,2",value:0},{text: "200",value: 0},{text: "2000",value: 0}]

    },
    {
        text:  "\\textit{Wie hoch ist dein Sparguthaben, wenn du bei einem} \\\\ \\textit{Zinssatz von 1,5  \\% im Jahr Zinsen in Höhe von 7,50 € erhältst?}",
        answers: [ {text:"500 €",value:1},{text:"550 €",value:0},{text: "600 €",value: 0},{text: "825 €",value: 0}]
    },

    {
        text:  "\\textit{Der Durchmesser eines Reifens beträgt 60 cm. Wie groß ist sein Umfang?}",
        answers: [ {text:"19,1 cm",value:0},{text:"94,2 cm",value:0},{text: "102,25 cm",value: 0},{text: "188,4 cm",value: 1}]
    }
];


const internettechnologien =
    [
//1
    {
        text:  "Welches der folgenden Protokolle ist ein Internetprotokoll?",
        answers: [ {text:"HTTP",value:1},{text:"HTML",value:0},{text: "CSS",value: 0},{text: "UTP",value: 0}]

    },
    {
        text:  "Welches Transportprotokoll eignet sich für zeitkritische Übertragungen",
        answers: [ {text:"UDP",value:1},{text:"TCP",value:0},{text: "HTTP",value: 0},{text: "Fast Retransmit",value: 0}]

    },
    {
        text:  "Definiert die Struktur und das Layout von Webseiten.?",
        answers: [ {text:"XML",value:0},{text:"HTML",value:1},{text: "REST",value: 0},{text: "CSS",value: 0}]

    },
    {
        text:  "Was ist ein SSL",
        answers: [ {text:"Security certificate",value:1},{text:"Protocol",value:0},{text: "Portal",value: 0},{text: "DNS",value: 0}]

    },
    {
        text:  "Eine vierteilige, durch Punkte getrennte Nummer, die zur Identifizierung eines mit dem Internet verbundenen Computers verwendet wird",
        answers: [ {text:"IP addresses",value:1},{text:"Subnet Mask",value:0},{text: "Gateway",value: 0},{text: "DNS",value: 0}]

    },
    {
        text:  "Welcher der folgenden Punkte lokalisiert Ressourcen im Internet?",
        answers: [ {text:"IP addresses",value:1},{text:"Computer names",value:0},{text: "WPA codes",value: 0},{text: "Port nummer",value: 0}]

    },
    {
        text:  "Welche der folgenden Hardwarekomponenten verbindet verschiedene Netzwerke miteinander?",
        answers: [ {text:"Router",value:1},{text:"Server",value:0},{text: "Dongle",value: 0},{text: "Firewall",value: 0}]

    }
]

let questions;
let quiz;
fragesatz.innerHTML = "<img src='image/hi.gif'  width='70%' height='80%'  float='left' overflow= 'hidden'/>";
buttonsElem.innerHTML = "";
pagesElem.innerHTML = "";



rest.onclick=  function() { // перезапишет существующий обработчик


    xhrHandler();
    fragesatz.innerHTML = "<img src='image/load.gif'  width='70%' height='80%'  float='left' overflow= 'hidden'/>";
    buttonsElem.innerHTML = "";
    pagesElem.innerHTML = "";
    shuffle(final_result);
    questions=final_result;

    quiz = new Quiz(questions, results);
    setTimeout(Update, 3000);
     if ( status =='404' ){
         quiz=null;
       fragesatz.innerHTML = "404: Not Found";
         document.getElementById("fach").innerHTML="Warscheinlich gebt es keine verbindung";
         return}
    document.getElementById("fach").innerHTML="Fragen vom Server";

};



mathelernen.onclick = function() { // перезапишет существующий обработчик
    shuffle(mathefragen);
    questions=mathefragen;
    quiz = new Quiz(mathefragen, results);
    Update();
    document.getElementById("fach").innerHTML="Wir lernen Mathe, ist nicht schwer";
};


notenlernen.onclick = function() { // перезапишет существующий обработчик
    shuffle(internettechnologien);
    questions = internettechnologien;
    quiz = new Quiz(internettechnologien, results);
    Update();
    document.getElementById("fach").innerHTML="Wir lernen IT !!! =P ";
};



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}