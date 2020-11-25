<template>
	<div>
		<a-space>
			<a-dropdown :trigger="['click']">
				<a-menu slot="overlay">
					<a-menu-item key="1">
						<a-radio-group v-model="base" @change="onChangeBase">
							<a-radio v-for="(valute, i) in this.$store.state.can_be_base" :value="valute" :key="i">{{ valute }}</a-radio>
						</a-radio-group>
					</a-menu-item>
				</a-menu>
				<a-button size="large" :loading="this.$store.state.loading">Базова валюта <a-icon type="down" /></a-button>
			</a-dropdown>

			<a-dropdown :trigger="['click']" v-model="visible" @visibleChange="visibleChange">
				<a-button size="large" class="ant-dropdown-link" :loading="this.$store.state.loading">Вибрані валюти <a-icon type="down" /></a-button>
				<a-menu slot="overlay">
					<a-menu-item key="1">
						<a-select mode="multiple" :defaultValue="selected" style="width: 220px" @change="handleChangeAllowed" placeholder="Відображуванні валюти">
							<a-select-option v-for="item in this.$store.state.allowed_currency" :key="item"
							>{{ item }}</a-select-option>
						</a-select>
					</a-menu-item>
				</a-menu>
			</a-dropdown>
		</a-space>
	</div>
</template>

<script>
import { Button, Dropdown, Radio, Space } from 'ant-design-vue'


export default {
	data() {
		return {
			base: this.$store.state.base_currency,
			visible: false,
			selected: this.$store.state.selected_currency,
		}
	},
	methods: {
		onChangeBase(e) {
			this.$store.commit('loadingStatus', true)
			this.$store.commit('changeBase', e.target.value)
			this.$store.dispatch('applyCurrency')
		},
		handleChangeAllowed(value) {
			this.selected = value
		},
		visibleChange(visible) {
			if(!visible) {
				if (this.$store.state.selected_currency !== this.selected) {
					this.$store.commit('loadingStatus', true)
					this.$store.commit('changeSelected', this.selected)
					this.$store.dispatch('applyCurrency')
				}
			}
		},
    },
	components: {
		'a-button': Button, 'a-dropdown': Dropdown, 'a-radio': Radio, 'a-space': Space
	}
}
</script>

<style scoped>

</style>
