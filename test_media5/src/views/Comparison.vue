<template>
  <main class="main">
    <div v-if="products.length" class="main-wrapper">

      <div class="header">
        <div class="header-container">

          <LeftBlock
            :products="products"
            :key="products.length"
            @deleteAll="deleteAll"
          />

          <div class="compare-goods">

            <CompareGoods
              :products="products"
              :px='px'
              :key="products.length"
              @deleteGood="deleteGood"
            />

            <Scroll
              @horizontalScroll="horizontalScroll"
            />

          </div>
        </div>
      </div>

      <CompareInfo
        :products="products"
        :px='px'
        :key="products.length"
      />

    </div>

    <div v-else class="message">
      <p>Выберите товары для сравнения!</p>
    </div>
  </main>
</template>

<script>
  import CompareGoods from '@/components/CompareGoods.vue'
  import CompareInfo from '@/components/CompareInfo.vue'
  import LeftBlock from '@/components/LeftBlock.vue'
  import Scroll from '@/components/Scroll.vue'

  export default {
    name: 'Comparison',

    data() {
      return {
        products: null,
        px: 0,
      }
    },

    created() {
      //получаем данные из json файла
      try {
        var dataJson = require('../assets/data.json')
        this.products = JSON.parse(JSON.stringify(dataJson.products))
        //console.log(this.products)
      } catch (error) {
        console.log(error)
      }
    },

    methods: {
      //расчитывает количество px скролла в зависимости от ширины экрана
      horizontalScroll(valueScroll) {
        var windowInnerWidth = window.innerWidth
        var coefficient

        if (windowInnerWidth > 1255) {
          coefficient = 9.6
        } else if (windowInnerWidth > 767 && windowInnerWidth < 1255) {
          coefficient = (1240 - windowInnerWidth) * 0.01 + 9.75
        } else if (windowInnerWidth < 767) {
          coefficient = (740 - windowInnerWidth) * 0.01 + 8
        }
        this.px = valueScroll * coefficient
      },

      //удаляет товар из списка сравнения
      deleteGood(idGoods) {
        var prod = JSON.parse(JSON.stringify(this.products))
        var k = 0
        this.products = []
        for (let i in prod) {
          if (prod[i].id != idGoods) {
            this.products[k] = prod[i]
            k++
          }
        }
      },

      //удаляет все товары из списка сравнения
      deleteAll() {
        this.products = []
      }
    },

    components: {
      CompareGoods,
      CompareInfo,
      LeftBlock,
      Scroll,
    }
  }
</script>
