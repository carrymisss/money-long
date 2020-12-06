<template>
	<a-row type="flex" justify="center" align="middle">
		<a-col span="18">
			<a-card class="converter-card" :style="`${haveError ? 'color: #f5222d; border-color: #f5222d; ': null}`">
				<span class="converter-icon" :style="`${haveError ? 'color: #f5222d; border-color: #f5222d; ': null}`">
					<a-icon type="swap" style="transform: scale(1, -1);" />
				</span>
				<a-row :gutter="[32,24]" type="flex" justify="space-between">
					<a-col span="11">
						<a-input-number :formatter="value => value && code1 ? `${gs(code1)} ${value}` : null" :parser="value => value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')" placeholder="Значення" style="width: 100%;" id="number1" v-model="number1" :min="0" @change="onChangeNumber1" :disabled="this.$store.state.loading || disable || !(code1 && code2)"/>
					</a-col>
					<a-col span="11">
						<a-input-number :formatter="value => value && code2 ? `${gs(code2)} ${value}` : null" :parser="value => value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')" placeholder="Значення" style="width: 100%;" id="number2" v-model="number2" :min="0" @change="onChangeNumber2" :disabled="this.$store.state.loading || disable || !(code2 && code1)"/>
					</a-col>
					<a-col span="11">
						<a-select placeholder="Валюта" style="width: 100%;" id="valute1" @change="onChangeValute1" show-search option-filter-prop="children" :disable="this.$store.state.loading || disable">
							<a-select-option v-for="item in j" :key="item[0]">{{ item[0] }}</a-select-option>
						</a-select>
					</a-col>
					<a-col span="11">
						<a-select placeholder="Валюта" style="width: 100%;" id="valute2" @change="onChangeValute2" show-search option-filter-prop="children" :disable="this.$store.state.loading || disable">
							<a-select-option v-for="item in jj" :key="item[0]">{{ item[0] }}</a-select-option>
						</a-select>
					</a-col>
				</a-row>
			</a-card>
		</a-col>
	</a-row>
</template>

<script>
import axios from 'axios'
import fx from 'money'
import { message } from 'ant-design-vue'
import getSymbolFromCurrency from 'currency-symbol-map'

export default {
	data() {
		return {
			number1: '',
			number2: '',
			valute1: null,
			valute2: null,
			code1: null,
			code2: null,
			valute1_rates: {},
			valute2_rates: {},
			disable: false,
			haveError: false
		}
	},
	computed: {
		j() {
			return !this.valute1 ? this.$store.state.currency.concat(this.$store.state.markered) : this.valute1
		},
		jj() {
			return !this.valute2 ? this.$store.state.currency.concat(this.$store.state.markered) : this.valute2
		}
	},
	methods: {
		gs(code) {
			return getSymbolFromCurrency(code)
		},
		onChangeNumber1(value) {
			if (value) {
				fx.base = this.code1
				fx.rates = this.valute1_rates
				fx.settings = { from: this.code1, to: this.code2 }
				this.number2 = fx.convert(value).toFixed(4)
			}
		},
		onChangeNumber2(value) {
			if (value) {
				fx.base = this.code2
				fx.rates = this.valute2_rates
				fx.settings = { from: this.code2, to: this.code1 }
				this.number1 = fx.convert(value).toFixed(4)
			}
		},
		onChangeValute1(value) {
			this.valute2 = this.$store.state.currency.concat(this.$store.state.markered).filter(el => el[0] !== value)
			this.code1 = value
			this.disable = true
			axios.get(`https://v6.exchangerate-api.com/v6/438e94c48003b424294be18f/latest/${value}`).then(({ data }) => {
				if (data.result === 'success') {
					this.haveError = false
					this.valute1_rates = Object.assign(data.conversion_rates)
					this.disable = false
					if (this.number2) {
						fx.base = this.code1
						fx.rates = this.valute1_rates
						fx.settings = { from: this.code1, to: this.code2 }
						this.number2 = fx.convert(this.number1).toFixed(4)
					}
				} else {
					this.haveError = true
					// eslint-disable-next-line no-undef
					message.error('Error' + data.error-type && data.error-type)
				}
			}).catch(error => {
				this.haveError = true
				message.error(''+error)
			})
		},
		onChangeValute2(value) {
			this.valute1 = this.$store.state.currency.concat(this.$store.state.markered).filter(el => el[0] !== value)
			this.code2 = value
			this.disable = true
			axios.get(`https://v6.exchangerate-api.com/v6/438e94c48003b424294be18f/latest/${value}`).then(({ data }) => {
				if (data.result === 'success') {
					this.haveError = false
					this.valute2_rates = Object.assign(data.conversion_rates)
					this.disable = false
					if (this.number1) {
						fx.base = this.code1
						fx.rates = this.valute1_rates
						fx.settings = { from: this.code1, to: this.code2 }
						this.number2 = fx.convert(this.number1).toFixed(4)
					}
				} else {
					this.haveError = true
					// eslint-disable-next-line no-undef
					message.error('Error' + data.error-type && data.error-type)
				}
			}).catch(error => {
				this.haveError = true
				message.error(''+error)
			})
		},
	}
}
</script>

<style scoped>
.converter-card {
	position: relative;
}
.converter-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 16px;
	width: 40px;
	height: 40px;
	border: 1px solid rgba(0, 0, 0, 0.65);
	border-radius: 50%;
	display: flex;	
	justify-content: center;
	align-items: center;
}
</style>
