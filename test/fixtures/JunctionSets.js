const { createJunction } = require('../../lib')
const JunctionSet = require('../../lib/JunctionSet').default
const Junctions = require('./Junctions')
const Serializers = require('./Serializers')


module.exports = {
  get invoiceScreen() {
    return JunctionSet(createJunction({
      details: { default: true },
      attachments: true,
    }))
  },

  get invoiceListScreen() {
    return JunctionSet({
      main: createJunction({
        list: {
          default: true,
          path: '/list',
          paramTypes: {
            page: { default: 1, serializer: Serializers.number },
            pageSize: { default: 20, serializer: Serializers.number },
          }
        },
        invoice: {
          data: {
            component: 'invoiceScreen',
          },
          paramTypes: {
            id: { required: true },
          },
          next: module.exports.invoiceScreen,
        },
      }),
      addModal: createJunction({
        open: true,
      }),
    })
  },

  get appScreen() {
    return JunctionSet(createJunction({
      dashboard: {},
      invoices: {
        default: true,
        paramTypes: {
          admin: { serializer: Serializers.flag },
        },
        next: module.exports.invoiceListScreen,
      },
    }))
  }
}
