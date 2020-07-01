// Main changes



$(document).ready(function () {
    getQuizList();
    createQuestion(questionCount);
});

let questionCount = 1;
let optionCount = 3;
let questionData = [];

// Quiz List

function getQuizList() {
    const data = {
        "category_id":localStorage.getItem('category')
    };
    postApi('http://api.techqueto.in/api/get-quiz-list',data).then(x => {
        const quizList = x.data;
        let html = ' <option value="" disabled selected >Choose a category</option>';
        quizList.map((data, i) => {
            html += `<option value="${data['quiz_unique_id']}">${data['quiz_name']}</option>`;
        });
        document.getElementById("quiz-type").innerHTML = html;
    });

}

// Category By Quiz

function getCategoryByQuiz() {
    let quiz = document.getElementById("quiz-type");
    let quizValue = quiz.options[quiz.selectedIndex].value;
    const data = {
        "quiz_id": quizValue
    };
    if (data['quiz_id']) {
        postApi('http://api.techqueto.in/api/get-all-quiz-category', data).then(x => {
            if (x.status) {
                if (x.data) {
                    const categoryList = x.data;
                    let html = ' <option value="" disabled selected >Choose a category</option>';
                    categoryList.map((data, i) => {
                        html += `<option value="${data['category_id']}">${data['category_name']}</option>`;
                    });
                    document.getElementById("categories").innerHTML = html;
                    // document.getElementById("category").style = "display:block";
                    // document.getElementById("categories").style = "display:block";
                }
            }
        });
    }
}

// Question By Category
function getCategoryQuestion() {
    questionData = [];
    let category = document.getElementById("categories");
    let categoryValue = category.options[category.selectedIndex].value;
    const data = {
        "category_id": categoryValue
    };
    if (data['category_id']) {
        postApi('http://api.techqueto.in/api/get-question-category', data).then(x => {
            if (x.status) {
                if (x.data) {
                    x.data.map(x => {
                        questionData.push(x);
                    });
                    createQuestionDropDown();
                };
            }
        });
    }
}



// // Get Category List
// function getCategory() {
//     getApi('http://api.techqueto.in/api/get-all-category').then(x => {
//         const categoryList = x.data;
//         let html = ' <option value="" disabled selected >Choose a category</option>';
//         categoryList.map((data, i) => {
//             html += `<option value="${data['category_id']}">${data['category_name']}</option>`;
//         });
//         document.getElementById("categories").innerHTML = html;
//     });
// };

//User creating the survey
function createUser() {
    let username = document.getElementById("username").value;
    let userQuestionCount = document.getElementById("questionCount").value;
    if (username && userQuestionCount) {
        if (username.match(/^[a-zA-Z]+$/)) {
            if (userQuestionCount < 11 && userQuestionCount > 1) {
                document.getElementById('loader').style = "display:flex";
                const data = {
                    "name": username
                };
                localStorage.setItem('userQuestionCount', userQuestionCount);

                postApi('http://api.techqueto.in/api/create-user', data).then(x => {
                    let user_id = localStorage.getItem('user_id');
                    let base64code = localStorage.getItem('base64code');
                    document.getElementById("questionCount").value = '';
                    document.getElementById('loader').style = "display:none";
                    if (user_id && base64code) {
                        localStorage.setItem('user_id', x['user_id']);
                        localStorage.setItem('base64code', x['token']);
                        document.getElementById("first-section").style = "display:none";
                        document.getElementById("second-section").style = "display:block";

                    } else {
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('base64code');
                        localStorage.setItem('user_id', x['user_id']);
                        localStorage.setItem('base64code', x['token']);
                        document.getElementById("first-section").style = "display:none";
                        document.getElementById("second-section").style = "display:block";
                    }

                });
            } else {
                alert("min 2 and max 10");
            }
        } else {
            alert("Letter only");
        }
    } else {
        alert("Value is missing");
    }

}

//  Option creation section
function createOption(questionNumber, optionNumber, value = "Enter the option value") {
    let html = '';
    html += ` <div class="option-enclosure" id="option-enclosure-${questionNumber}-${optionNumber}">`;
    html += `<input type="radio" class="option-input radio" id="radio-question-${questionNumber}-option-${optionNumber}" name="answer-1" value="question-${questionNumber}-option-${optionNumber}">`;
    html += `<div class="option">`;
    html += `<textarea maxlength="56" spellcheck="false" id="question-${questionNumber}-option-${optionNumber}" type="text" class="form-control text-option-shadow" rows="2" name="text-option-3" placeholder="Pleace enter the option" required>${value}</textarea>`;
    html += ` </div>`;
    html += `<a type="button" class="close button-close option-remove" id="remove-option-${questionNumber}-${optionNumber}" onclick="removeOption('option-enclosure-${questionNumber}-${optionNumber}')">`;
    html += `<span class="option-remove-icon">x</span></button></div>`;
    var element = document.getElementById('options-div');
    element.insertAdjacentHTML('beforeend', html);
}

// Question creation section
function createQuestion() {
    document.getElementById('question-section').innerHTML = '';
    document.getElementById('options-div').innerHTML = '';
    let html = '';
    html += ` <textarea maxlength="100" spellcheck="false" id="question-${questionCount}" type="text" class="form-control text-option-shadow" rows="3" name="question" placeholder="Enter your Question">If he meets with a genie, what would be his/her wish?</textarea>`;
    document.getElementById('text-question-title').innerHTML = `Question ${questionCount}`;
    document.getElementById('question-section').innerHTML = html;
    for (i = 1; i <= optionCount; i++) {
        createOption(questionCount, i);
    }
}

// creating question selection drop down
function createQuestionDropDown() {
    debugger;
    document.getElementById("select-question").innerHTML = '';
    let html = ' <option value=""  selected >Select question</option>';
    questionData.map((data, i) => {
        html += `<option value="${i}">${data['question']}</option>`;
    });
    document.getElementById("select-question").innerHTML = html;

}


// Set select question in textbox
function getSelectedQuestion() {
    var questionList = document.getElementById("select-question");
    var indexValue = questionList.options[questionList.selectedIndex].value;
    if (indexValue) {
        setSelectedQuestion(indexValue);
    }
}


// add extra option to question
function addOption() {
    if (optionCount < 6) {
        optionCount += 1;
        createOption(questionCount, optionCount);

    } else {
        alert("you can only add 6 option");
    }

}


// remove option from the question
function removeOption(id) {
    let optionDiv = document.getElementById(`${id}`);
    optionDiv.remove();
    optionCount -= 1;
}

// move to nextquestion
function nextQuestion() {
    questionValidation();

}


// validation for the question

function questionValidation() {
    let userAnswerValue, userAnswer, correctAnswer, userQuestionCountValue, userAnswerId;
    let optionstatus = true;
    userQuestionCountValue = parseInt(localStorage.getItem('userQuestionCount'));
    userAnswer = document.getElementsByName('answer-1');
    for (var i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i].checked) {
            userAnswerValue = userAnswer[i].value;
            userAnswerId = userAnswer[i].id;
        }
    }

    for (i = 1; i <= optionCount; i++) {
        optionValue = document.getElementById(`question-${questionCount}-option-${i}`).value;
        if (optionValue) {} else {
            optionstatus = false;
        }
    }

    questionValue = document.getElementById(`question-${questionCount}`).value;

    if (optionstatus && questionValue) {
        if (userAnswerValue) {
            correctText = document.getElementById(`${userAnswerValue}`).value;
            correctAnswer = {
                "text": correctText,
                "id": userAnswerId
            };
            if (userQuestionCountValue === questionCount) {
                submitValue(correctAnswer);
            } else {
                addUserQuestion(correctAnswer)
            }
        } else {
            alert("Please select one answer");
        }
    } else {
        alert("value missing");
    }
}

function submitQuestion(correctAnswer) {
    let questionValue, userId;
    userId = localStorage.getItem('user_id');
    questionValue = document.getElementById(`question-${questionCount}`).value;
    let optionList = [];
    let optionValue = '';
    for (i = 1; i <= optionCount; i++) {
        optionValue = document.getElementById(`question-${questionCount}-option-${i}`).value;
        if (optionValue == "") {
            alert("option value missing");
            return null;
        }
        if (optionValue) {
            optionList.push({
                "optionValue": optionValue,
                "id": `radio-question-${questionCount}-option-${i}`
            });
        } else {
            alert("value missing..");
            optionList = [];
        }
    }

    if (optionList) {
        let data = {
            "userId": userId,
            "question": questionValue,
            "optionData": JSON.stringify(optionList),
            "answer": JSON.stringify(correctAnswer)
        };
        postApi('http://api.techqueto.in/api/add-user-question', data).then(x => {
            return true
        });
    }

}


function addUserQuestion(correctAnswer) {
    let userQuestionCountValue = parseInt(localStorage.getItem('userQuestionCount'));
    if (userQuestionCountValue > questionCount) {
        submitQuestion(correctAnswer);
        questionCount += 1;
        optionCount = 3;

        createQuestion(questionCount);
        if (userQuestionCountValue === questionCount) {
            document.getElementById('nextbutton').style = "display:none";
            document.getElementById('donebutton').style = "display:block";
        }
    }
}

function submitValue(correctAnswer) {
    submitQuestion(correctAnswer);
    let userId = localStorage.getItem('user_id');
    let url = window.location.hostname;
    let path = url + '/quiz.html?quiz_id=' + userId;
    document.getElementById('link-path').value = path;
    document.getElementById("second-section").style = "display:none";
    document.getElementById("third-section").style = "display:block";
}



function setSelectedQuestion(questionindex) {

    const Value = questionData[questionindex];
    optionCount = questionData.length;
    let optionList = JSON.parse(Value['options']);
    document.getElementById('question-section').innerHTML = '';
    document.getElementById('options-div').innerHTML = '';
    let html = '';
    html += ` <textarea maxlength="100" spellcheck="false" id="question-${questionCount}" type="text" class="form-control text-option-shadow" rows="3" name="question" placeholder="Enter your Question">${Value['question']}</textarea>`;
    document.getElementById('text-question-title').innerHTML = `Question ${questionCount}`;
    document.getElementById('question-section').innerHTML = html;
    for (i = 1; i <= optionCount; i++) {
        createOption(questionCount, i, optionList[i - 1]['value']);
    }
}

// copy link function
function copyLink() {
    var copytext = document.getElementById('link-path')
    copytext.select();
    copytext.setSelectionRange(0, 99999); /*for mobile device*/
    document.execCommand("copy");
    alert("Copied the text: " + copytext.value);
}


// whatapp sharing
function decorateWhatsAppLink() {
    let userId = localStorage.getItem('user_id');
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
    let userId = localStorage.getItem('user_id');
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
    let userId = localStorage.getItem('user_id');
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
document.getElementById('button-menu-mobile').addEventListener('click', function() {
    var box1 = document.getElementById('mobile-menu')
    if(box1.style.display == 'none')
    {
        box1.style.display = 'block'
    }
    else{
        box1.style.display = 'none'
    }
})
document.getElementById('mobile-menu-close').addEventListener('click', function() {
    var box2= document.getElementById('mobile-menu')
    if(box2.style.display == 'block')
    {
        box2.style.display = 'none'
    }
})