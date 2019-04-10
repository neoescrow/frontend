/* global $, Neon */

const CONTRACT_ADDRESS = ''
const CONTRACT_SCRIPTHASH = ''
const PRIV_RPC_NODE = ''

let pkey = ''
let amount = 0
let sellerAddress = ''

$('.login-form button').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow')
  pkey = $('.login-form input').val()
})

$('.create-escrow-form button').click(() => {
  amount = $('.login-form input').val()
  sellerAddress = $('.login-form input').val()
  createEscrow(pkey, amount, sellerAddress)
})

function createEscrow (pkey, amount, sellerAddress) {
  const apiProvider = new Neon.api.neoscan.instance('PrivateNet')

  const intent = Neon.api.makeIntent({ NEO: amount }, CONTRACT_ADDRESS)
  const props = {
    scriptHash: CONTRACT_SCRIPTHASH,
    operation: 'create_escrow',
    args: [sellerAddress]
  }
  const script = Neon.default.create.script(props)
  const config = {
    api: apiProvider,
    url: PRIV_RPC_NODE,
    account: pkey,
    intents: intent,
    script: script
  }

  Neon.default.doInvoke(config).then(config => {
    console.log(config.response)
  }).catch(config => {
    console.log(config)
  })
}
