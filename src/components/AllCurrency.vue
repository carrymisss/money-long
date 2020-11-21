<template>
	<!-- <transition
		name="custom-classes-transition"
		enter-active-class="animated fadeIn faster delay-1s"
		leave-active-class="animated fadeOut faster delay-1s"> -->
		<a-row type="flex" justify="center" align="middle">
			<a-col span="18">
				<a-list v-if="getMarkeredLength > 0" class="c-marked-currency" itemLayout="horizontal" :dataSource="getMarkered" bordered>
					<a-list-item class="item-marked" slot="renderItem" slot-scope="item, index">
						<a-button @click="unMarkCurrency(index)" class="btn-marked" slot="actions" type="danger" shape="circle"><i class="fas fa-bookmark"></i></a-button>
						<a-list-item-meta>
							<span slot="title">
								{{ item[0] }}
								<a-badge class="c-base-badge" v-if="item[2]" count="base" />
							</span>
							<a-avatar class="flag-avatar" slot="avatar" :src="`./flags/${item[0]}.png`" />
						</a-list-item-meta>
						<span class="c-currency__value">{{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: item[0] }).format(item[1]) }}</span>
					</a-list-item>
				</a-list>

				<a-list class="c-currency-list" itemLayout="horizontal" :dataSource="getCurrency" bordered :loading="getLoading">
					<a-list-item slot="renderItem" slot-scope="item, index" >
						<a-button @click="MarkCurrency(index)" slot="actions" type="danger" shape="circle" class="btn-notmarked"><i class="fas fa-bookmark"></i></a-button>
						<a-list-item-meta>
							<span slot="title">
								{{ item[0] }}
								<a-badge class="c-base-badge" v-if="item[2]" count="base" />
							</span>
							<a-avatar class="flag-avatar" slot="avatar" :src="`./flags/${item[0]}.png`" />
						</a-list-item-meta>
						<span class="c-currency__value">{{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: item[0] }).format(item[1]) }}</span>
					</a-list-item>
				</a-list>
			</a-col>
		</a-row>
	<!-- </transition> -->
</template>

<script>
import { List, Row, Col, Button } from 'ant-design-vue'
import { mapGetters } from 'vuex'

/* eslint-disable */

export default {
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['getCurrency', 'getMarkered', 'getLoading', 'getMarkeredLength']),
	},
	methods: {
		MarkCurrency(index) {
			// this.$data.markedCurrency.push(this.$data.currency[index])
			// this.$data.currency.splice(index, 1)
			// if (this.$data.markedCurrency) {
			// 	this.$data.markedCurrency.sort(function (a, b) {
			// 	  return a.id - b.id
			// 	})
			// }
		},
		unMarkCurrency(index) {
		// 	this.$data.currency.push(this.$data.markedCurrency[index])
		// 	this.$data.markedCurrency.splice(index, 1)
		// 	if (this.$data.currency) {
		// 		this.$data.currency.sort(function (a, b) {
		// 		  return a.id - b.id
		// 		})
		// 	}
		}
	},
	components: {
		'a-list': List, 'a-row': Row, 'a-col': Col, 'a-button': Button
	}
}
</script>

<style>
	.flag-avatar {
		box-shadow: 0 0 10px -4px #292929;
	}
	.ant-list-item-meta-title span {
		display: -webkit-flex;
		display: -ms-flex;
		display: flex;
		-ms-align-items: center;
		align-items: center;
		text-align: center;
	}
	.ant-list-item-action li {
		display: -webkit-inline-flex;
		display: -ms-inline-flex;
		display: inline-flex;
	}
	.ant-list-item-meta-title {
		margin: 0;
		font-size: 18px;
	}
	.ant-list-item-meta {
		-ms-align-items: center;
		align-items: center;
	}
	.ant-list-item-content {
		justify-content: center !important;
	}
	.c-base-badge {
		margin-left: 10px;
	}
	.c-marked-currency .c-base-badge sup {
		background-color: #FF6E4E;
		-webkit-box-shadow: 0 0 0 1px #CEFF9D;
		box-shadow: 0 0 0 1px #CEFF9D;
	}
	.c-currency__value {
		font-size: 18px;
	}
	.c-currency-list.ant-list-bordered {
		border-color: #fff;
	}
	.c-marked-currency.ant-list-bordered {
		border-color: #CEFF9D;
	}
	.c-marked-currency.ant-list-bordered .ant-list-item {
		border-color: #434343;
	}
	.item-marked {
		background-color: #CEFF9D;
	}
	.btn-marked {
		position: relative;
		background-color: #fff;
		border-color: #d9d9d9;
		color: #434343;
	}
	.btn-marked:hover {
		background-color: #fff;
		border-color: #000;
		color: #434343;
	}
	.btn-marked:active {
		background-color: #d9d9d9;
	}
	.btn-marked i {
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
		position: absolute;
		top: 19px;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn-marked i:after {
		content: "\f02e";
		position: absolute;
		width: 100%;
		left: 50%;
		opacity: 1;
		transform: translateX(-50%);
		top: -12px;
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
	}
	.btn-marked:hover i {
		top: 7px;
	}
	.btn-marked:hover i:after {
		top: 0;
	}
	.btn-marked:focus {
		background-color: #d9d9d9;
		border-color: #434343;
		color: #434343;
	}
	/* .btn-notmarked {
		color: #434343;
	}
	.btn-notmarked i {
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
		position: absolute;
		top: 7px;
		left: 50%;
		transform: translateX(-50%);
	}
	.btn-notmarked i:after {
		content: "\f02e";
		position: absolute;
		width: 100%;
		left: 50%;
		opacity: 1;
		transform: translateX(-50%);
		top: 0;
		-webkit-transition: 300ms;
		-o-transition: 300ms;
		transition: 300ms;
		-webkit-transition-timing-function: easy-in-out;
		-o-transition-timing-function: easy-in-out;
		transition-timing-function: easy-in-out;
	}
	.btn-notmarked:hover i {
		top: 19px;
	}
	.btn-notmarked:hover i:after {
		top: -12px;
	} */
</style>
