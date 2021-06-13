"use strict"
let frageID = ["3187", "3194", "3195","3197","3198","3200","3203","3202"];
let final_result = Array();
let status = null;


    function xhrHandler() {

        let xhr = getXhr();
        (function loop(i, length) {
            if (i >= length) {
                 status = 'ok';
                return;
            }
            var url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/' + frageID[i];
            xhr.open("GET", url);
            xhr.setRequestHeader("Authorization", "Basic " + btoa("aleksandr.pronin@htw-dresden.de:qaahqCat13%"));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && status == null) { //warten bis alle frage heruntergeladen sind
                    final_result.push({
                        text: JSON.parse(xhr.responseText).text,
                        answers: [{
                            text: JSON.parse(xhr.responseText).options[0],
                            value: 1
                        }, {
                            text: JSON.parse(xhr.responseText).options[1],
                            value: 0
                        }, {
                            text: JSON.parse(xhr.responseText).options[2],
                            value: 0
                        }, {text: JSON.parse(xhr.responseText).options[3],
                            value: 0}]
                    });
                    loop(i + 1, length);
                }
            }
            xhr.send();
        })(0, frageID.length);


    function getXhr() {
        if (window.XMLHttpRequest) {
            let xhr = new XMLHttpRequest();
            return xhr;
        } else return false
    }

        xhr.onload = function() {
            if (xhr.status != 200) { //Analysieren den HTTP-Antwortstatus, wenn der Status nicht 200 ist, gab es einen Fehler
                console.log(`Fehler ${xhr.status}: ${xhr.statusText}`);
                status='404' // 404: Not Found
            } else { // wenn alles gut gegangen ist, das Ergebnis ausgeben
                console.log(`Alles gut`); // response
          }
        };

        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Empfangen nur ${event.loaded} von ${event.total} byte`);
            } else {
                console.log(`Empfangene Bytes: ${event.loaded} `); // wenn es keinen Content-Length-Header in der Antwort gibt
            }

        };

        xhr.onerror = function() {
            alert( "Anfrage fehlgeschlagen");
            status='404'
        };
        return  xhr.onload;
    }


