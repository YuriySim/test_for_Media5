<template>
  <div
    :style="translate"
    class="compare-goods__container"
  >
    <div
      class="compare-goods__box"
      v-for="product in products"
      :key="product.id"
    >
      <a
        class="compare-goods__delete-icon"
        @click.prevent="deleteGoods(product.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
      </a>

      <div class="compare-goods__card">
        <div class="compare-goods__img">
          <img :src="getImgSrc(product.main_img)" :alt="product.title"/>
        </div>
        <div class="compare-goods__info">
          <p class="compare-goods__title-goods">{{ product.title }}</p>
          <p class="compare-goods__price">{{product.cost_full}} ₽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CompareGoods',

    props: {
      products: {
        required: true,
        type: Object,
      },

      px: {required: true},
    },

    methods: {
      getImgSrc(img) {
        return require('../assets/img/' + img)
      },

      deleteGoods(idGoods) {
        this.$store.commit('setToggleKey', true)
        this.$emit('deleteGood', idGoods)
      },
    },

    computed: {
      //производит смещение блока товаров при скроле
      translate() {
        return { "transform" : 'translateX(-' + this.px + 'px)' }
      }
    },
  }
</script>

