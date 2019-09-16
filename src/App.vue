<template>
  <div id="app">
    <section class="quiz-container">
      <router-view></router-view>
    </section>
  </div>
</template>

<style>
body {
  margin: 0;
  background: #8e91ac;
  font-family: sans-serif;
  height: 100vh;
  color: #646bab;
}

#app {
  height: 100%;
}

button {
  display: block;
  border: 1px solid #7d90aa;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #fff;
  color: #646bab;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button:hover,
button:focus {
  background: #d0e2dd;
  border: 1px solid #d0e2dd;
}

button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

button:active {
  transform: scale(0.99);
}

.quiz-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quiz-modal {
  background-color: #fff;
  border-radius: 16px;
  padding: 60px 30px;
  max-width: 640px;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 800px) {
  body {
    margin: auto 20px;
    font-size: 0.9em;
  }

  button {
    font-size: 0.9em;
  }

  .quiz-modal {
    background-color: #fff;
    border-radius: 16px;
    padding: 60px 30px;
    min-width: 0;
  }
}
</style>
