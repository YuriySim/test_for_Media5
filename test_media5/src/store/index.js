// vuex модуль хранит и изменяет значение ключа, отвечающего за состояние кнопок
// "Различающиеся" и "Все характеристики"
import { createStore } from "vuex";

export default createStore({
  state: {
    toggleKey: true
  },

  mutations: {
    setToggleKey(state, toggleKey) {
      state.toggleKey = toggleKey;
    }
  },

  getters: {
    toggleKey: state => state.toggleKey
  }
});
