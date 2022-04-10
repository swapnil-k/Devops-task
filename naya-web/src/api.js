export const signInAPICall = (data) => {
  return fetch('https://naya-api-nznegpbkqa-el.a.run.app/api/login', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err))
}

export const exploreAPICall = () => {
  return fetch('https://naya-api-nznegpbkqa-el.a.run.app/api/allSketches', {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': 'https://naya-api-nznegpbkqa-el.a.run.app/'
    }
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}

export const metadataAPICall = async (data) => {
  return fetch('https://naya-api-nznegpbkqa-el.a.run.app/api/metaData', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const updateSketchAPICall = async (data) => {
  return await fetch('https://naya-api-nznegpbkqa-el.a.run.app/api/updateSketch', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const editAPICall = (data) => {
  return fetch('https://naya-api-nznegpbkqa-el.a.run.app/api/sketchWithUserInfo', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log(response.body)
      return response.json();
    })
    .catch(err => console.log(err))
}

