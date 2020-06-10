
async function postApi(url, payload = {}, header = {}) {
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      // credentials: 'include',
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return result.json();
  }

  async function getApi(url, header = {}) {
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      // credentials: 'include',
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer',
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return result.json();
  }

  async function getApi(url, header = {}) {
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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



