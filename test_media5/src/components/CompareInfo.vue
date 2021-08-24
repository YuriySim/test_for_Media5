<template>
  <div class="compare-info">
    <div class="compare-info__container">

      <div class="compare-info__group">

        <!--Общие характеристики-->

        <div class="compare-info__title-group">
          <p>Общие характеристики</p>
        </div>

        <div
          class="compare-info__container-group"
          v-for="prop in commonInfo"
          :key="prop"
        >
          <div class="compare-info_cat-title">
            <p>{{ prop[0].name }}</p>
          </div>
          <div class="compare-info__table">
            <div
              class="compare-info__container-table"
              v-for="p in prop"
              :key="p.goods_id"
              :style="translate"
            >
              <div class="compare-info__box">
                <p>{{ p.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--Конструктивные особенности-->

        <div class="compare-info__title-group">
          <p>Конструктивные особенности</p>
        </div>

        <div
          class="compare-info__container-group"
          v-for="prop in constructiveInfo"
          :key="prop"
        >
          <div class="compare-info_cat-title">
            <p>{{ prop[0].name }}</p>
          </div>
          <div class="compare-info__table">
            <div
              class="compare-info__container-table"
              v-for="p in prop"
              :key="p.goods_id"
              :style="translate"
            >
              <div class="compare-info__box">
                <p>{{ p.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--Дополнительные характеристики-->

        <div class="compare-info__title-group">
          <p>Дополнительные характеристики</p>
        </div>

        <div
          class="compare-info__container-group"
          v-for="prop in additionalInfo"
          :key="prop"
        >
          <div class="compare-info_cat-title">
            <p>{{ prop[0].name }}</p>
          </div>
          <div class="compare-info__table">
            <div
              class="compare-info__container-table"
              v-for="p in prop"
              :key="p.goods_id"
              :style="translate"
            >
              <div class="compare-info__box">
                <p>{{ p.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--Технические характеристики-->

        <div class="compare-info__title-group">
          <p>Технические характеристики</p>
        </div>

        <div
          class="compare-info__container-group"
          v-for="prop in technicalInfo"
          :key="prop"
        >
          <div class="compare-info_cat-title">
            <p>{{ prop[0].name }}</p>
          </div>
          <div class="compare-info__table">
            <div
              class="compare-info__container-table"
              v-for="p in prop"
              :key="p.goods_id"
              :style="translate"
            >
              <div class="compare-info__box">
                <p>{{ p.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom_for_mobil"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CompareInfo',

    props: {
      products: {
        required: true,
        type: Object,
      },

      px: {required: true},
    },

    data() {
      return {
        commonInfo: {},
        constructiveInfo: {},
        additionalInfo: {},
        technicalInfo: {},
      }
    },

    methods: {
      // Обрабатывает данные
      dataProcessing() {
        var prod = JSON.parse(JSON.stringify(this.products))
        var amount = prod.length

        //создает объект содержащий характеристики всех товаров
        //пример 32:["Вид спорта", "Дополнительные характеристики"]
        var props_all = (() => {
          var props_all = new Set()
          for (let i of prod) {
            for (let j in i.props) {
              props_all[i.props[j].prop_id] = [i.props[j].name, i.props[j].cat_id]
            }
          }
          return props_all
        })()

        //дополняет тавары отсутвующими характеристиками со значением value ='-'
        var additional = (() => {
          for (let i of prod) {
            for (let k in props_all) {
              if (!(k in i.props)) {
                i.props[k] = {
                  prop_id: +k,
                  name: props_all[k][0],
                  value: '-',
                  cat_id: props_all[k][1]
                }
              }
            }
          }
        })()

        //разбивает характеристики всех товаров на 4 группы
        var splitIntoGroups = (() => {
          var k = 0
          for (let i of prod) {
            for (let j in i.props) {
              if (i.props[j].cat_id === "Общие характеристики") {
                this.commonInfo[k] = {...i.props[j], goods_id: i.id}
                k++
              }else if (i.props[j].cat_id === "Конструктивные особенности") {
                this.constructiveInfo[k] = {...i.props[j], goods_id: i.id}
                k++
              }else if (i.props[j].cat_id === "Дополнительные характеристики") {
                this.additionalInfo[k] = {...i.props[j], goods_id: i.id}
                k++
              }else if (i.props[j].cat_id === "Технические характеристики") {
                this.technicalInfo[k] = {...i.props[j], goods_id: i.id}
                k++
              }
            }
          }
        })()

        //сортирует (группирует) характеристики товаров внутри групп
        var sortInfo = info => {
          var count = 0
          var id_props = new Set()
          var main_res = {}
          var res = {}

          for (let i in info) {
            id_props.add(info[i].prop_id)
          }

          for (let id of id_props) {
            for (let i in info) {
              if(info[i].prop_id == id) {
                res[count] = info[i]

                if(count == amount - 1){
                  count = 0
                } else count++
              }
            }
            main_res[id] = res
            res = {}
          }
          return main_res
        }

        this.commonInfo = sortInfo(this.commonInfo)
        this.constructiveInfo = sortInfo(this.constructiveInfo)
        this.additionalInfo = sortInfo(this.additionalInfo)
        this.technicalInfo = sortInfo(this.technicalInfo)

        //console.log(this.commonInfo)
        //console.log(this.constructiveInfo)
        //console.log(this.additionalInfo)
        //console.log(this.technicalInfo)

      },

      //фильтрует данные при нажатии кнопки "Различающиеся"
      dataFilter() {
        var filter = info => {
          for (let i in info) {
            var value = new Set()

            for(let j in info[i]) {
              value.add(info[i][j].value)
            }
            if (value.size === 1) {
              delete info[i]
            }
          }
        }

        filter(this.commonInfo)
        filter(this.constructiveInfo)
        filter(this.additionalInfo)
        filter(this.technicalInfo)

        //console.log(this.commonInfo)
        //console.log(this.constructiveInfo)
        //console.log(this.additionalInfo)
        //console.log(this.technicalInfo)
      }
    },

    mounted() {
      this.dataProcessing()
    },

    computed: {
      //производит смещение блока товаров при скроле
      translate() {
        return { "transform" : 'translateX(-' + this.px + 'px)' }
      },

      //получает значение ключа, отвечающего за состояние кнопок
      // "Различающиеся" и "Все характеристики"
      toggleKey() {
        return this.$store.getters.toggleKey
      }
    },

    watch: {
      //отслеживает изменение значения ключа и производит фильрацию данных при нажатии кнопок
      // "Различающиеся" и "Все характеристики"
      toggleKey() {
        if(!this.toggleKey) {
          this.dataFilter()
        } else {
          this.commonInfo = {}
          this.constructiveInfo = {}
          this.additionalInfo = {}
          this.technicalInfo = {}

          this.dataProcessing()
        }
      }
    }
  }
</script>

