<script lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import api from '@/services/api';
import availableCryptos from '@/constants/cryptos';
import availableCurrency from '@/constants/currency';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      availableCryptos,
      availableCurrency,
      selectedCrypto: null,
      selectedCurrency: null,
      isFetchable: false,
      data: null,
      loading: false,
    };
  },
  methods: {
    async fetchValues() {
      if (this.isFetchable) {
        this.loading = true;
        try {
          const result = await api({
            params: {
              ids: this.selectedCrypto,
              convert: this.selectedCurrency,
            },
          });
          this.data = result.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  created() {
    this.$watch(
      () => ({
        selectedCrypto: this.selectedCrypto,
        selectedCurrency: this.selectedCurrency,
      }),
      (data: Record<string, null | string>) => {
        if (data.selectedCrypto && data.selectedCurrency) {
          this.isFetchable = true;
        }
      },
    );
  },
  watch: {
    isFetchable(newVal) {
      if (newVal) {
        this.fetchValues();
      }
    },
  },
});
</script>

<template>
  <div class="home">
    <div class="wrapper">
      <div class="currency-options">
        <select v-model="selectedCrypto">
          <option
            v-for="crypto in availableCryptos"
            :key="crypto.id"
            :value="crypto.id"
          >
            {{ crypto.value }}
          </option>
        </select>

        <p>To</p>

        <select v-model="selectedCurrency">
          <option
            v-for="currency in availableCurrency"
            :key="currency.id"
            :value="currency.id"
          >
            {{ currency.value }}
          </option>
        </select>
      </div>

      <p v-if="loading">loading...</p>

      <div v-if="data">
        <p>{{ JSON.stringify(data) }}</p>
      </div>
    </div>
  </div>
</template>
