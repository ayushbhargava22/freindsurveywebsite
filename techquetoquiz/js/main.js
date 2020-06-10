// Main changes



$(document).ready(function () {
    localStorage.clear();
    getCategory();
    createQuestion(questionCount);

});

let questionCount = 1;
let optionCount = 3;


function getCategory() {
    getApi('http://api.techqueto.in/api/get-all-category').then(x => {
        const categoryList = x.data;
        let html = ' <option value="" disabled selected >Choose a category</option>';
        categoryList.map((data, i) => {
            html += `<option value="${data['category_id']}">${data['category_name']}</option>`;
        });
        document.getElementById("categories").innerHTML = html;
    });
};


function createUser() {
    let username = document.getElementById("username").value;
    let userQuestionCount = document.getElementById("questionCount").value;


    const data = {
        "name": username
    };
    localStorage.setItem('userQuestionCount', userQuestionCount);
    postApi('http://api.techqueto.in/api/create-user', data).then(x => {
        let user_id = localStorage.getItem('user_id');
        document.getElementById("questionCount").value = '';
        if (user_id) {
            localStorage.setItem('user_id', x['user_id']);
            document.getElementById("first-section").style = "display:none";
            document.getElementById("second-section").style = "display:block";

        } else {
            localStorage.removeItem('user_id');
            localStorage.setItem('user_id', x['user_id']);
            document.getElementById("first-section").style = "display:none";
            document.getElementById("second-section").style = "display:block";
        }

    });
}


function createOption(questionNumber, optionNumber) {
    let html = '';
    html += ` <div class="option-enclosure" id="option-enclosure-${questionNumber}-${optionNumber}">`;
    html += `<input type="radio" class="option-input radio" id="radio-question-${questionNumber}-option-${optionNumber}" name="answer-1" value="question-${questionNumber}-option-${optionNumber}">`;
    html += `<div class="option">`;
    html += `<textarea maxlength="56" spellcheck="false" id="question-${questionNumber}-option-${optionNumber}" type="text" class="form-control text-option-shadow" rows="2" name="text-option-3" placeholder="Option 3" required>To be the king of the World</textarea>`;
    html += ` </div>`;
    html += `<a type="button" class="close button-close option-remove" id="remove-option-${questionNumber}-${optionNumber}" onclick="removeOption('option-enclosure-${questionNumber}-${optionNumber}')">`;
    html += `<span class="option-remove-icon">x</span></button></div>`;
    var element = document.getElementById('options-div');
    element.insertAdjacentHTML('beforeend', html);
}

function createQuestion() {
    document.getElementById('question-section').innerHTML = '';
    let html = '';
    html += ` <textarea maxlength="100" spellcheck="false" id="question-${questionCount}" type="text" class="form-control text-option-shadow" rows="3" name="question" placeholder="Enter your Question">If he meets with a genie, what would be his/her wish?</textarea>`;
    document.getElementById('text-question-title').innerHTML = `Question ${questionCount}`;
    document.getElementById('question-section').innerHTML = html;
    for (i = 1; i <= optionCount; i++) {
        createOption(questionCount, i);
    }
}

function addOption() {
    if (optionCount < 6) {
        optionCount += 1;
        createOption(questionCount, optionCount);
        
    } else {
        alert("you can only add 6 option");
    }

}

function removeOption(id) {
    let optionDiv = document.getElementById(`${id}`);
    optionDiv.remove();
    optionCount -= 1;
}

function nextQuestion() {
    questionValidation();

}

function questionValidation(){
    let userAnswerValue,userAnswer,correctAnswer,userQuestionCountValue,userAnswerId;
    userQuestionCountValue = parseInt(localStorage.getItem('userQuestionCount'));
    userAnswer = document.getElementsByName('answer-1');
    for(var i = 0; i < userAnswer.length; i++){
        if(userAnswer[i].checked){
            userAnswerValue = userAnswer[i].value;
            userAnswerId = userAnswer[i].id;
        }
    }

   
    
    if(userAnswerValue){
        correctText = document.getElementById(`${userAnswerValue}`).value;
        correctAnswer = {
                "text":correctText,
                "id":userAnswerId
        };
        if(userQuestionCountValue === questionCount){
            submitValue(correctAnswer);
        }else{
            addUserQuestion(correctAnswer)
        }
    }else{
        alert("Please select one answer");
    }
}

function submitQuestion(correctAnswer){
    let questionValue,userId;
    userId = localStorage.getItem('user_id');
    questionValue =   document.getElementById(`question-${questionCount}`).value;
    let optionList = [];
    let optionValue = '';
    for (i = 1; i <= optionCount; i++) {
        optionValue = document.getElementById(`question-${questionCount}-option-${i}`).value;
        if(optionValue){
            optionList.push({"optionValue":optionValue,"id":`radio-question-${questionCount}-option-${i}`});
        }else{
            alert("value missing..");
            optionList = [];
        }      
    }
  
    let data = {
        "userId":userId,
        "question":questionValue,
        "optionData":JSON.stringify(optionList),
        "answer":JSON.stringify(correctAnswer)
    };
    postApi('http://api.techqueto.in/api/add-user-question', data).then(x => {
        console.log(x);
    });

}


function addUserQuestion(correctAnswer) {
    let userQuestionCountValue = parseInt(localStorage.getItem('userQuestionCount'));
    if(userQuestionCountValue > questionCount){
        submitQuestion(correctAnswer);
        questionCount += 1;
        optionCount = 3;
        document.getElementById('options-div').innerHTML = '';
        createQuestion(questionCount);
    if(userQuestionCountValue === questionCount){
            document.getElementById('nextbutton').style = "display:none";
            document.getElementById('donebutton').style = "display:block";
        }
    } else{
       
    }
}

function submitValue(correctAnswer){
    submitQuestion(correctAnswer);
    let userId = localStorage.getItem('user_id');
    let url = window.location.hostname;
    let path = url+'/survey-ui/quiz.html?quiz_id='+userId;
    document.getElementById('link-path').value = path;
    document.getElementById("second-section").style = "display:none";
    document.getElementById("third-section").style = "display:block";
}
