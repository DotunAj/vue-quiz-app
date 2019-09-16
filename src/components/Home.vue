<template>
  <div class="quiz-modal">
    <div class="home-container">
      <h3>How well do you know computer Science? Try out this quiz</h3>
      <p>Select difficulty level</p>
      <div class="buttons">
        <router-link class="button" to="question/easy">Easy</router-link>
        <router-link class="button" to="question/medium">Medium</router-link>
        <router-link class="button" to="question/hard">Hard</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.home-container p {
  margin-top: 20px;
  font-size: 1.1em;
  text-align: center;
  color: #8e91ac;
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
  font-size: 1.1em;
}

.button:hover {
  background: #a7aac9;
}
</style>
