import { Notify } from 'quasar'

const show = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

export default async ({ Vue }) =>{
  Vue.prototype.$showNotif = show
}