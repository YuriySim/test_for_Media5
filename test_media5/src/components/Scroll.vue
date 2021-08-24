<template>
  <div class="scroll">
    <input
      class="scroll__track"
      type="range"
      steps="1"
      min="0"
      max="100"
      v-model="valueScroll"
    >
  </div>
</template>

<script>

  export default {
    name: 'Scroll',

    data () {
      return {
        valueScroll: 0,
      }
    },

    watch: {
      //отслеживает перемещение ползунка слайдера
      valueScroll() {
        this.$emit('horizontalScroll', this.valueScroll)
      },
    },
  }
</script>
