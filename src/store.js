import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

/* eslint-disable */

export default new Vuex.Store({
   state: {
      currency: [],
      markered: [],
      loading: true,
      base_currency: 'USD',
      allowed_currency: [],
      selected_currency: ['USD', 'EUR', 'UAH', 'RUB', 'JPY'],
      can_be_base: ['USD', 'EUR']
   },
   mutations: {
      setCurrency(state, result) {
         this.state.currency = result
      },
      loadingStatus(state, value) {
         this.state.loading = value
      },
      setAllowed(state, result) {
         this.state.allowed_currency = []
         for (var i = 0; i < result.length; i++)
            this.state.allowed_currency.push(result[i][0])
      },
      changeAllowed(state, result) {
         this.state.selected_currency = []
         this.state.selected_currency.push(result)
      },
      changeBase(state, value) {
         this.state.base_currency = value
      }
   },
   actions: {
      async applyCurrency({ commit, state }) {
         const key = '438e94c48003b424294be18f'
         axios.get(`https://prime.exchangerate-api.com/v5/${key}/latest/${state.base_currency}`)
            .then(function (response) {
               const sorter = (el) => {
                  if (el[0] === state.base_currency) {
                     return el.push('isBase')
                  }
                  for (var i = 0; i < state.selected_currency.length; i++) {
                     if (el[0] === state.selected_currency[i]) {
                        return el
                     }
                  }
               }
               commit('setAllowed', Object.entries(response.data.conversion_rates))
               commit('setCurrency', Object.entries(response.data.conversion_rates).filter(sorter))
               commit('loadingStatus', false)
            })
            .catch(error => {
               console.log(error)
            })
      },
      // async reloadCurrency({commit, state}) {
      //    const key = '438e94c48003b424294be18f';
      //    axios.get(`https://prime.exchangerate-api.com/v5/${key}/latest/${state.base_currency}`)
      //    .then(function (response) {
      //       const result = Object.entries(response.data.conversion_rates);
      //       commit('setCurrency', result.filter(sorter));
      //       commit('loadingStatus', false);
      //    })
      //    .catch(function (error) {
      //       // handle error
      //       console.log(error);
      //    });
      // }
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
      }
   }
})
