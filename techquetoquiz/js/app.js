

  async function getApi(url, header = {}) {
    const base64code = localStorage.getItem('base64code') || null;
    if (base64code) {
      header.Authorization = base64code;
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
  }

    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...header,
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




