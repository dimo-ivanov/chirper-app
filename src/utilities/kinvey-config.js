const appId = 'kid_ByO6vV2JG'
const appSecret = 'c75a134cd1774b09aa8c5e3e1b58b04e'
const appUrl = 'https://baas.kinvey.com'
const appKey = window.btoa(`${appId}:${appSecret}`) // a2lkX0J5TzZ2VjJKRzpjNzVhMTM0Y2QxNzc0YjA5YWE4YzVlM2UxYjU4YjA0ZQ==

export default {
  url: appUrl,
  id: appId,
  secret: appSecret,
  key: appKey
}
