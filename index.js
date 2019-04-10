/* global $, Neon */

const CONTRACT_ADDRESS = 'AY6jHK2G7ZydvafkiXDQg4wLm6qLTUKAji'
const CONTRACT_SCRIPTHASH = '072b84050cb64a41db5db94148a53d73cdee12b3'
const PRIV_RPC_NODE = 'http://127.0.0.1:30333'
const NEO_SCAN_URL = 'http://127.0.0.1:4000/api/main_net'

let pkey = ''
let amount = 0
let sellerAddress = ''

const config = {
  name: 'PrivateNet',
  extra: {
    neoscan: NEO_SCAN_URL
  }
}

Neon.default.add.network(new Neon.rpc.Network(config))

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
