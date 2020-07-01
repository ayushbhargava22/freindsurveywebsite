function setCategory($category_id){
    if(localStorage.getItem('category') === ''){
        localStorage.setItem('category',$category_id);
    }else{
        localStorage.clear();
        localStorage.setItem('category',$category_id);
    }
    window.location="/create-survey.html"
}


$(document).ready(function () {
localStorage.clear();
  localStorage.setItem('category','');
});

    