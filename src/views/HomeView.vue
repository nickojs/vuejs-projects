<script lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import { defineComponent } from 'vue';
import availableCryptos from '@/constants/cryptos';
import availableCurrency from '@/constants/currency';
import api from '@/services/api';
import Select from '@/components/Select.vue';
import { CryptoProps } from '@/interfaces';

export default defineComponent({
  components: {
    Select,
  },
  data(): CryptoProps {
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
        this.data = null;
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
        console.log(data.selectedCrypto, data.selectedCurrency);
        if (data.selectedCrypto && data.selectedCurrency) {
          this.isFetchable = true;
        }
      },
    );
  },
  watch: {
    selectedCrypto(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchValues();
      }
    },
    selectedCurrency(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchValues();
      }
    },
    isFetchable(newVal) {
      if (newVal) this.fetchValues();
    },
  },
});
</script>

<template>
  <div class="home">
    <div class="wrapper">
      <div class="currency-options">
        <Select
          v-model="selectedCrypto"
          :disabled="loading"
          :options="availableCryptos"
        />
        <Select
          v-model="selectedCurrency"
          :disabled="loading"
          :options="availableCurrency"
        />
      </div>

      <p v-if="loading">loading...</p>

      <div v-if="data">
        <p>{{ JSON.stringify(data) }}</p>
      </div>
    </div>
  </div>
</template>
