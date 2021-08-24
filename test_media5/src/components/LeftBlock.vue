<template>
  <div class="left-block">
    <div class="left-block__container">
      <p class="left-block__text">Сравнить: {{ products.length }}</p>
      <div class="left-block__button">
        <a
          class="button"
          :class="{'active-button': toggleKey}"
          href="#"
          @click.prevent="toggleFilter(1)"
        >
          Все характеристики
        </a>

        <a
          class="button"
          :class="{'active-button': !toggleKey}"
          href="#"
          @click.prevent="toggleFilter(0)"
        >
          Различающиеся
        </a>
      </div>
      <a
        class="button-clear"
        href="#"
        @click.prevent="deleteAll"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
        <p>Очистить список</p>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'LeftBlock',

    props: {
      products: {
        required: true,
        type: Object,
      },
    },

    data() {
      return {
        toggleKey: null,
      }
    },

    mounted() {
      //получает значение ключа, отвечающего за состояние кнопок
      // "Различающиеся" и "Все характеристики"
      this.toggleKey = this.$store.getters.toggleKey
    },

    methods: {
      //производит изменение ключа при клике на кнопки
      // "Различающиеся" и "Все характеристики"
      toggleFilter(param) {
        if(!param && this.toggleKey) {
          this.toggleKey = !this.toggleKey
          this.$store.commit('setToggleKey', this.toggleKey)
        }else if (param && !this.toggleKey) {
          this.toggleKey = !this.toggleKey
          this.$store.commit('setToggleKey', this.toggleKey)
        }
      },

      deleteAll() {
        this.$emit('deleteAll')
      }
    }
  }
</script>

