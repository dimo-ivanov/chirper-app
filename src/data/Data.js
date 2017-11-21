import Auth from '../components/users/Auth'
import kinvey from '../utilities/kinvey-config'

const baseUrl = kinvey.url

const getOptions = () => ({
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const handleJsonResponse = res => res.json()

const applyBasicAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    options.headers.Authorization = `Basic ${kinvey.key}`
  }
}

const applyKinveyAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    options.headers.Authorization = `Kinvey ${Auth.getToken()}`
  }
}

class Data {
  static get (url, authenticated) {
    let options = getOptions()
    options.method = 'GET'

    applyKinveyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
  }

  static post (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyBasicAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
  }

  static postKinvey (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyKinveyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
  }

  static putKinvey (url, data, authenticated) {
    let options = getOptions()
    options.method = 'PUT'
    options.body = JSON.stringify(data)

    applyKinveyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
  }

  static delete (url, authenticated) {
    let options = getOptions()
    options.method = 'DELETE'

    applyKinveyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
  }
}

// const baseUrl = 'http://localhost:5000'

// const getOptions = () => ({
//   mode: 'cors',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// })

// const handleJsonResponse = res => res.json()

// const applyAuthorizationHeader = (options, authenticated) => {
//   if (authenticated) {
//     options.headers.Authorization = `bearer ${Auth.getToken()}`
//   }
// }

// class Data {
//   static get (url, authenticated) {
//     let options = getOptions()
//     options.method = 'GET'

//     applyAuthorizationHeader(options, authenticated)

//     return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
//   }

//   static post (url, data, authenticated) {
//     let options = getOptions()
//     options.method = 'POST'
//     options.body = JSON.stringify(data)

//     applyAuthorizationHeader(options, authenticated)

//     return window.fetch(`${baseUrl}${url}`, options).then(handleJsonResponse)
//   }
// }

export default Data
