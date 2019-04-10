/* global $ */

let pkey = ''

$('.login-form button').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow')
  pkey = $('.login-form input').val()
})

$('.create-escrow-form button').click(() => {
  console.log(pkey)
})
