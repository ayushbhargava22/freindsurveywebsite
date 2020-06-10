$(document).ready(function () {
    localStorage.clear();
    getQuizid();
    getQuestions();
    getUserList();
});


let questionNumber = 0;
let questionLength = 0;
let questionData = '';
let userScroce = 0;

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
    postApi('http://api.techqueto.in/api/get-question', data).then(x => {
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
            userScroce += 10;
            questionNumber += 1;
        } else {
            document.getElementById(optionId).className += " red";
            document.getElementById(anwserData['id']).className += " green";
            questionNumber += 1;
        }
      setTimeout(createQuestion,1000);
    }else{
        if (anwserData['id'] === optionId) {
            document.getElementById(optionId).className += " green";
            userScroce += 10;
        } else {
            document.getElementById(optionId).className += " red";
            document.getElementById(anwserData['id']).className += " green";    
           
        }
        addUserData();
      
        
    }
}

function addUserData(){
    let surveyUserName = document.getElementById('username').value;
    const data = {
        "user_id": localStorage.getItem('quiz_id'),
        "survey_user_name":surveyUserName,
        "survey_user_score":userScroce
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
           document.getElementById('userList').innerHTML= html;
       }
    });
}