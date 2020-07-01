$(document).ready(function () {
    localStorage.clear();
    getUserById();
});


let questionNumber = 0;
let questionLength = 0;
let questionData = '';
let userScroce = 0;
let totalScroce = 0;

function getQuizid() {
    let params = new URLSearchParams(window.location.search);
    let quiz_id = params.get('quiz_id')
    localStorage.setItem('quiz_id', quiz_id);
}

function getQuestions() {
    let quiz_id = localStorage.getItem('quiz_id');
    const data = {
        "userId": quiz_id
    };
    postApi('http://api.techqueto.in/api/get-user-question', data).then(x => {
        questionData = x.data;
        questionLength = x.data.length;
        createQuestion();
    });
}

function createQuestion() {
    document.getElementById('question-section').innerHTML = '';
    document.getElementById('option-section').innerHTML = '';
    let questionhtml = '';
    let optionhtml = '';
    let optionList = JSON.parse(questionData[questionNumber]['options']);
    questionhtml = `<div class="question-bg" id="question-${(questionNumber+1)}">${questionData[questionNumber]['question']}</div>`;
    optionList.map((i, x) => {
        optionhtml += `  <div class="progress option-bg option-1-bg" id="${i['id']}" onclick="nextQuestion('${i['id']}')">
                        <span class="option-text option1_1" id="option-${(x+1)}">${i['optionValue']}</span>
                        </div> `;
    });
    document.getElementById('question-section').innerHTML = questionhtml;
    document.getElementById('option-section').innerHTML = optionhtml;
}

function showquestion() {
    document.getElementById('survey-user-section').style = "display:none";
    document.getElementById('survey-question-section').style = "disply:block";
}


function nextQuestion(optionId) {
  
    let anwserData = JSON.parse(questionData[questionNumber]['answer']);
    if (questionNumber != (questionLength-1)) {
        if (anwserData['id'] === optionId) {
            document.getElementById(optionId).className += " green";
            totalScroce += 10;
            userScroce += 10;
            questionNumber += 1;
        } else {
            document.getElementById(optionId).className += " red";
            document.getElementById(anwserData['id']).className += " green";
            totalScroce += 10;
            questionNumber += 1;
        }
       
      setTimeout(createQuestion,1000);
    }else{
        if (anwserData['id'] === optionId) {
            document.getElementById(optionId).className += " green";
            totalScroce += 10;
            userScroce += 10;
        } else {
            document.getElementById(optionId).className += " red";
            document.getElementById(anwserData['id']).className += " green";    
            totalScroce += 10;
           
        }
        addUserData();
    }
}

function addUserData(){
    let surveyUserName = document.getElementById('username').value;
    const data = {
        "user_id": localStorage.getItem('quiz_id'),
        "survey_user_name":surveyUserName,
        "survey_user_score":userScroce,
        "survey_total_score":totalScroce
    };
    postApi('http://api.techqueto.in/api/create-survey-user', data).then(x => {
        if(x.status){
            location.reload();
        }
    });
}


function getUserList(){
    let html = `<tr>
                    <th>Name</th>
                    <th style="width: 30%;">Score</th>
                    <th style="width: 30%;">Total Score</th>
                </tr>`;
    const data = {
        "user_id" :localStorage.getItem('quiz_id'),
    };
    postApi('http://api.techqueto.in/api/get-survey-user', data).then(x => {
       if(x.status){
           x.data.map(value=>{
            html += `<tr>
                      <td>${value['survey_user_name']}</td>
                      <td style="width: 30%;">${value['survey_user_score']}</td>
                      <td style="width: 30%;">${value['survey_total_score']}</td>
                    </tr>`;
           });
           document.getElementById('userList').innerHTML= html;
       }
    });
}

function getUserById(){
    getQuizid();
    const data = {
        "user_id" :localStorage.getItem('quiz_id'),
    };
    postApi('http://api.techqueto.in/api/get-userId', data).then(x => {
        if(x.status){
            let data  = x.data;
            localStorage.setItem('base64code', data['token']);
            getQuestions();
            getUserList();
        }
    });
}


/*for new table*/
function getUserScore(){
    let html = `<tr>
                    <th>Name</th>
                    <th style="width: 30%;">Score</th>
                </tr>`;
    const data = {
        "user_id" :localStorage.getItem('quiz_id'),
    };
    postApi('http://api.techqueto.in/api/get-survey-user', data).then(x => {
       if(x.status){
           x.data.map(value=>{
            html += `<tr>
                      <td>${value['survey_user_name']}</td>
                      <td style="width: 30%;">${value['survey_user_score']}</td>
                    </tr>`;
           });
           document.getElementById('userscore').innerHTML= html;
       }
    });
}


function decorateWhatsAppLink() {
    let userId = localStorage.getItem('quiz_id');
    let url = window.location.hostname;
    let path = url + '/quiz.html?quiz_id=' + userId;
    var urll = 'whatsapp://send?text=';
    var text = path;
    var encodedText = encodeURIComponent(text);

    var $whatsApp = $('.share-btn-div a');

    $whatsApp.attr('href', urll + encodedText);
}

// twitter sharing
function decoratetwitterLink() {
    let userId = localStorage.getItem('quiz_id');
    let url = window.location.hostname;
    let path = url + '/quiz.html?quiz_id=' + userId;
    var twitterShare = document.getElementById('twitter-btnn')


    twitterShare.onclick = function (e) {
        e.preventDefault();
        var twitterWindow = window.open('https://twitter.com/share?url=' + path, 'twitter-popup', 'height=350,width=600');
        if (twitterWindow.focus) {
            twitterWindow.focus();
        }
        return false;
    }

}


// facebook sharing
function decoratefacebookLink() {
    let userId = localStorage.getItem('quiz_id');
    let url = window.location.hostname;
    let path = url + '/quiz.html?quiz_id=' + userId;
    var facebookShare = document.getElementById('facebook-btnn');


    facebookShare.onclick = function (e) {
        e.preventDefault();
        var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + path, 'facebook-popup', 'height=350,width=600');
        if (facebookWindow.focus) {
            facebookWindow.focus();
        }
        return false;
    }
}