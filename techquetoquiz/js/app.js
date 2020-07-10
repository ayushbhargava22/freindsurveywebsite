

  async function getApi(url, header = {}) {
    const base64code = localStorage.getItem('base64code') || null;
    if (base64code) {
      header.Authorization = base64code;
      header.type = 'website';
    }

    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...header,
      },
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'same-origin',
      // credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'GET',
    });
    return result.json();
  }



async function postApi(url, payload = {}, header = {}) {
  const base64code = localStorage.getItem('base64code') || null;
  if (base64code) {
    header.Authorization = base64code;
    header.type  = 'website';
  }

    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...header,
      },
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'same-origin',
      // credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return result.json();
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
  var twitterShare = document.getElementById('twitter-btnn');
 
      var twitterWindow = window.open('https://twitter.com/share?url=' + path, 'twitter-popup', 'height=350,width=600');
      if (twitterWindow.focus) {
          twitterWindow.focus();
      }
      return false;

}

// facebook sharing
function decoratefacebookLink() {
  let userId = localStorage.getItem('user_id');
  let url = window.location.hostname;
  let path = url + '/quiz.html?quiz_id=' + userId;
  var facebookShare = document.getElementById('facebook-btnn');


 
      var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + path, 'facebook-popup', 'height=350,width=600');
      if (facebookWindow.focus) {
          facebookWindow.focus();
      }
      return false;
  
}


function decorateVkLink() {
  let userId = localStorage.getItem('user_id');
  let url = window.location.hostname;
  let path = url + '/quiz.html?quiz_id=' + userId;
  var twitterShare = document.getElementById('twitter-btnn')


      var VkWindow = window.open('http://vk.com/share.php?url=' + path, 'twitter-popup', 'height=350,width=600');
      if (VkWindow.focus) {
          VkWindow.focus();
      }
      return false;
  
}

