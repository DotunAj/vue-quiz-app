<template>
  <div class="progress">
    <div class="progress-bar">
      <div :style="barClass" class="bar"></div>
    </div>
    <p>{{numCorrect}}/{{numTotal}}</p>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: ["numCorrect", "numTotal"],
  computed: {
    barClass() {
      let style = "bar";
      let widthPercent = (this.numTotal / 10) * 100;
      style = `width:${widthPercent}%`;
      return style;
    }
  }
};
</script>

<style scoped>
.progress {
  display: flex;
  align-items: center;
}

.progress-bar {
  display: inline-block;
  margin-right: 10;
  width: 80%;
  background-color: #ddd;
  border-radius: 20px;
}

.bar {
  width: 1%;
  height: 6px;
  background-color: #a17aff;
  border-radius: 20px;
}

.progress p {
  display: inline-block;
  font-size: 0.8em;
  font-weight: lighter;
  margin-left: 10px;
}
</style>