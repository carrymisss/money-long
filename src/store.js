import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { message } from 'ant-design-vue'


Vue.use(Vuex)

/* eslint-disable */

export default new Vuex.Store({
   state: {
      currency: [],
      markered: [],
      loading: true,
      base_currency: 'USD',
      allowed_currency: [],
      selected_currency: ['UAH', 'RUB', 'JPY'],
      can_be_base: ['USD', 'EUR']
   },
   mutations: {
      changeLanguage(state, lang) {
         state.language = lang
      },
      setCurrency(state, result) {
         state.currency = result
      },
      loadingStatus(state, value) {
         state.loading = value
      },
      setAllowed(state, result) {
         state.allowed_currency = []
         for (var i = 0; i < result.length; i++) {
            state.allowed_currency.push(result[i][0])
         }
      },
      changeSelected(state, result) {
         state.selected_currency = result
      },
      changeBase(state, value) {
         state.base_currency = value
      },
      setMarkered(state, value) {
         let ix = state.currency.indexOf(state.currency.find(el => el[0] === value))
         state.markered.push(state.currency[ix])
         state.currency.splice(ix, 1)
         state.markered.sort()
         state.currency.sort()
         state.markered.sort((a, b) => {if(a[2]) return -1})
         state.currency.sort((a, b) => { if (a[2]) return -1 })
      },
      setUnMarkered(state, value) {
         let ix = state.markered.indexOf(state.markered.find(el => el[0] === value))
         state.currency.push(state.markered[ix])
         state.markered.splice(ix, 1)
         state.currency.sort()
         state.markered.sort()
         state.currency.sort((a, b) => { if (a[2]) return -1 })
         state.markered.sort((a, b) => { if (a[2]) return -1 })
      },
      clearMarkered(state) {
         state.markered = []
      }
   },
   actions: {
      applyCurrency({ commit, state }) {
         axios.get(`https://v6.exchangerate-api.com/v6/${process.env.VUE_APP_API_CURRENCY_KEY}/latest/${state.base_currency}`).then(({ data }) => {
            if(data.result === 'success') {
               const sorter = (el) => {
                  if (el[0] === state.base_currency) {
                     return el.push('isBase')
                  }
                  for (var i = 0; i < state.selected_currency.concat(state.can_be_base).length; i++) {
                     if (el[0] === state.selected_currency.concat(state.can_be_base)[i]) {
                        return el
                     }
                  }
               }
               commit('setAllowed', Object.entries(data.conversion_rates).filter(el => el[0] !== 'USD' && el[0] !== 'EUR'))
               commit('setCurrency', Object.entries(data.conversion_rates).filter(sorter))
               let old_markered = state.markered
               commit('clearMarkered')
               old_markered.forEach(el => {
                  state.currency.forEach(i => {
                     if (el[0] === i[0]) {
                        commit('setMarkered', el[0])
                     }
                  })
               })
               // localStorage.clear()
               // dispatch('applyStorage')
               commit('loadingStatus', false)
            } else {
               message.error('Error' + data.error-type && data.error-type)
            }
         }).catch(error => {
            message.error(''+error)
         })
      }
   },
   getters: {
      getBase(state) {
         return state.base_currency
      },
      getCurrency(state) {
         return state.currency
      },
      getMarkered(state) {
         return state.markered
      },
      getLoading(state) {
         return state.loading
      },
      getMarkeredLength(state) {
         return state.markered.length 
      },
      getCanBeUse(state) {
         return state.can_be_base
      },
      getAllowed(state) {
         return state.allowed_currency
      },
      getSelected(state) {
         return state.selected_currency
      },
      getCurrencyLength(state) {
         return state.currency.length
      },
      // getCurrencyValues(state) {
      //    return state.currency.map(el => { return el[0] })
      // }
   }
})
