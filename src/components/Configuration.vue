<template>
	<div>
		<a-dropdown :trigger="['click']">
			<a-menu slot="overlay">
				<a-menu-item key="1">
					<a-radio-group v-model="base" @change="onChangeBase">
						<a-radio v-for="(valute, i) in this.$store.state.can_be_base" :value="valute" :key="i">{{ valute }}</a-radio>
					</a-radio-group>
				</a-menu-item>
			</a-menu>
			<a-button style="margin: 0 5px" size="large" :loading="this.$store.state.loading">Базова валюта <a-icon type="down" /></a-button>
		 </a-dropdown>

		 <a-dropdown :trigger="['click']">
			 <a-menu slot="overlay">
				<a-menu-item key="1">
					<a-select mode="tags" :defaultValue="selected" style="width: 210px" @change="handleChangeAllowed" placeholder="Tags Mode">
						<a-select-option v-for="item in this.$store.state.allowed_currency" :key="item"
						>{{ item }}</a-select-option>
					</a-select>
				</a-menu-item>
			 </a-menu>
			 <a-button style="margin: 0 5px" size="large" @click="keepVisible" :loading="this.$store.state.loading">Вибрані валюти <a-icon type="down" /></a-button>
		  </a-dropdown>
	</div>
</template>

<script>
import { Button, Dropdown, Radio } from 'ant-design-vue'

export default {
	data() {
		return {
			base: this.$store.state.base_currency,
			visible: false,
			selected: this.$store.state.selected_currency
		}
	},
	methods: {
      onChangeBase(e) {
		this.$store.commit('loadingStatus', true);
		this.$store.commit('changeBase', e.target.value);
		this.$store.dispatch('applyCurrency');
      },
		handleChangeAllowed(value) {
		this.$store.commit('loadingStatus', true);
		this.$store.commit('changeAllowed', value);
		this.$store.dispatch('applyCurrency');
      },
		keepVisible() {
			this.$data.visible = !this.$data.visible;
		}
    },
	components: {
		'a-button': Button, 'a-dropdown': Dropdown, 'a-radio': Radio
  }
}
</script>

<style scoped>

</style>
