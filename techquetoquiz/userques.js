

/*const data = 
{
	"userId": "f04d3de3-af37-444e-a142-8c12df8b62a2"
};

postApi('http://api.techqueto.in/api/get-question', data).then(x => {
        let userId = localStorage.setItem('userId' , data);
})*/

const url = 'http://api.techqueto.in/api/get-question';
  postApi(url)
  
  .then(function(data) {
    let userid = data.userId;
    console.log(userid)
    localStorage.setItem('userid' , userid)
})