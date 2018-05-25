exports.userAvatar = user => {
  if (user.avatar) return user.avatar

  const firstName = user.name.split(' ')[0]
  const lastName = user.name.split(' ')[1]
  return window.HOST + '/avatars?name=' + firstName + '+' + lastName
}
