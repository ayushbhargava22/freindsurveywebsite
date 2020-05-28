function validate() {
    if(document.myform.Name.value == ""){
        alert("Please provide your name!");
        document.myform.Name.focus() ;
        return false ;
    }
}
function removeDiv_1_1(){
    var option1_1 =document.getElementById("option-enclosure-1-1")
    option1_1.parentNode.removeChild(option1_1);
}
    
function removeDiv_1_2(){
    var option1_2 =document.getElementById("option-enclosure-1-2")
    option1_2.parentNode.removeChild(option1_2);
}
   
function removeDiv_1_3(){
    var option1_3 =document.getElementById("option-enclosure-1-3")
    option1_3.parentNode.removeChild(option1_3);
}
function removeDiv_1_4(){
 
    document.getElementById("remove-option-1-4").addEventListener('click', function() {
        var box1 = document.getElementById("option-enclosure-1-4")
        if(box1.style.display=="flex")
        {
            box1.style.display = "none"
        }
       
        var box2= document.getElementById('add-option-button1')
        box2.innerHTML = 'Add an Option'
        box2.style.color = "white"
        box2.style.backgroundColor = "#979797"

    })
}
   
function removeDiv_2_1(){
    var option2_1 =document.getElementById("option-enclosure-2-1")
    option2_1.parentNode.removeChild(option2_1);
}
   
function removeDiv_2_2(){
    var option2_2 =document.getElementById("option-enclosure-2-2")
    option2_2.parentNode.removeChild(option2_2);
}
   
function removeDiv_2_3(){
    var option2_3 =document.getElementById("option-enclosure-2-3")
    option2_3.parentNode.removeChild(option2_3);
}

function removeDiv_3_1(){
    var option3_1 =document.getElementById("option-enclosure-3-1")
    option3_1.parentNode.removeChild(option3_1);
}
   
function removeDiv_3_2(){
    var option3_2 =document.getElementById("option-enclosure-3-2")
    option3_2.parentNode.removeChild(option3_2);
}
function removeDiv_3_3(){
    var option3_3 =document.getElementById("option-enclosure-3-3")
    option3_3.parentNode.removeChild(option3_3);
}

function removeDiv_4_1(){
    var option4_1 =document.getElementById("option-enclosure-4-1")
    option4_1.parentNode.removeChild(option4_1);
}

function removeDiv_4_2(){
    var option4_2 =document.getElementById("option-enclosure-4-2")
    option4_2.parentNode.removeChild(option4_2);
}
   
function removeDiv_4_3(){
    var option4_3 =document.getElementById("option-enclosure-4-3")
    option4_3.parentNode.removeChild(option4_3);
}

function removeDiv_5_1(){
    var option5_1 =document.getElementById("option-enclosure-5-1")
    option5_1.parentNode.removeChild(option5_1);
}

function removeDiv_5_2(){
    var option5_2 =document.getElementById("option-enclosure-5-2")
    option5_2.parentNode.removeChild(option5_2);
}
function removeDiv_5_3(){
    var option5_3 =document.getElementById("option-enclosure-5-3")
    option5_3.parentNode.removeChild(option5_3);
}

function removeDiv_6_1(){
    var option6_1 =document.getElementById("option-enclosure-6-1")
    option6_1.parentNode.removeChild(option6_1);
}
function removeDiv_6_2(){
    var option6_2 =document.getElementById("option-enclosure-6-2")
    option6_2.parentNode.removeChild(option6_2);
}
function removeDiv_6_3(){
    var option6_3 =document.getElementById("option-enclosure-6-3")
    option6_3.parentNode.removeChild(option6_3);
}
function removeDiv_7_1(){
    var option7_1 =document.getElementById("option-enclosure-7-1")
    option7_1.parentNode.removeChild(option7_1);
}
function removeDiv_7_2(){
    var option7_2 =document.getElementById("option-enclosure-7-2")
    option7_2.parentNode.removeChild(option7_2);
}
function removeDiv_7_3(){
    var option7_3 =document.getElementById("option-enclosure-7-3")
    option7_3.parentNode.removeChild(option7_3);
}
function removeDiv_8_1(){
    var option8_1 =document.getElementById("option-enclosure-8-1")
    option8_1.parentNode.removeChild(option8_1);
}
function removeDiv_8_2(){
    var option8_2 =document.getElementById("option-enclosure-8-2")
    option8_2.parentNode.removeChild(option8_2);
}
function removeDiv_8_3(){
    var option8_3 =document.getElementById("option-enclosure-8-3")
    option8_3.parentNode.removeChild(option8_3);
}
function removeDiv_9_1(){
    var option9_1 =document.getElementById("option-enclosure-9-1")
    option9_1.parentNode.removeChild(option9_1);
}
function removeDiv_9_2(){
    var option9_2 =document.getElementById("option-enclosure-9-2")
    option9_2.parentNode.removeChild(option9_2);
}
function removeDiv_9_3(){
    var option9_3 =document.getElementById("option-enclosure-9-3")
    option9_3.parentNode.removeChild(option9_3);
}
function removeDiv_9_3(){
    var option9_3 =document.getElementById("option-enclosure-9-3")
    option9_3.parentNode.removeChild(option9_3);
}
function removeDiv_9_3(){
    var option9_3 =document.getElementById("option-enclosure-9-3")
    option9_3.parentNode.removeChild(option9_3);
}
function removeDiv_9_3(){
    var option9_3 =document.getElementById("option-enclosure-9-3")
    option9_3.parentNode.removeChild(option9_3);
}
function removeDiv_10_1(){
    var option10_1 =document.getElementById("option-enclosure-10-1")
    option10_1.parentNode.removeChild(option10_1);
}
function removeDiv_10_2(){
    var option10_2 =document.getElementById("option-enclosure-10-2")
    option10_2.parentNode.removeChild(option10_2);
}
function removeDiv_10_3(){
    var option10_3 =document.getElementById("option-enclosure-10-3")
    option10_3.parentNode.removeChild(option10_3);
}



/*function createDiv(){
    var onediv = document.createElement('div');
    onediv.className = 'option-enclosure'
    onediv.id = 'option-enclosure-1-4'
    var oneinput = document.createElement('input')
    oneinput.type = 'radio'
    oneinput.id= 'radio-question-1-oquestion-1-alloptionsption-1'
    oneinput.name ='answer-1'
    oneinput.className ='radio option-input'
    onediv.appendChild(oneinput)
    var twodiv = document.createElement('div')
    twodiv.className = 'option'
    onediv.appendChild(twodiv)
    var textArea = document.createElement('textarea')
    textArea.maxLength = '56'
    textArea.id = 'question-1-option-4'
    textArea.type = 'text'
    textArea.rows ='2'
    textArea.name = 'text-option-4'
    textArea.className = 'form-control text-option-shadow'
    twodiv.appendChild(textArea)
    textArea.placeholder ='Option 4'
    var btn = document.createElement('button')
    btn.className = 'close button-close option-remove'
    onediv.appendChild(btn)
    btn.id = 'remove-option-1-4'
    btn.onclick = 'removeDiv_1_4()'
    var cross= document.createElement('span')
    cross.className ='option-remove-icon'
    btn.appendChild(cross)
    cross.innerText = 'x'
    document.getElementById("question-1-alloptions").appendChild(onediv) ;
}*/

document.getElementById("add-option-button1").addEventListener('click', function() {
    var box1 = document.getElementById("option-enclosure-1-4")
    if(box1.style.display=="none")
    {
        box1.style.display = "flex"
    }
   
})

document.getElementById('add-option-button1').addEventListener('click', function() {
    var box2= document.getElementById('add-option-button1')
    box2.innerHTML = 'You have reached the max Limit!'
    box2.style.color = "black"
    box2.style.backgroundColor = "red"
})