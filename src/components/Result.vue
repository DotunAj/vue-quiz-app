<template>
  <div class="quiz-modal">
    <div class="result-container">
      <h3>Thank you for playing!</h3>
      <p>
        You scored
        <span>{{numCorrect}}/{{numTotal}}</span>
      </p>
      <div class="buttons">
        <router-link class="button" to="/question">Play Again</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["numCorrect", "numTotal"])
  }
};
</script>

<style scoped>
.result-container {
  padding: 20px;
}

.result-container p {
  margin-top: 20px;
  font-size: 1.1em;
  text-align: center;
  color: #8e91ac;
}

.result-container p span {
  font-weight: bolder;
}

.buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none !important;
  justify-content: center;
  align-items: center;
}
.buttons .button {
  margin-top: 10px;
  width: 100px;
  text-decoration: none;
  text-align: center;
  color: #fff;
  background: #797eaa;
  padding: 15px;
  font-size: 1em;
  border-radius: 20px;
}

.button:hover {
  background: #a7aac9;
}
</style>