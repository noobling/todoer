exports.fetchUser = userId => {
  // eslint-disable-next-line
  axios.get(window.HOST + '/user/' + userId, { withCredentials: true }).then(({ data }) => {
    this.user = data
  })
}
