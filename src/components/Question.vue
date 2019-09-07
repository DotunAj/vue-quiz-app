<template>
  <div class="quiz">
    <p>
      <span>{{index+1}}.</span>
      {{currentQuestion.question}}
    </p>
    <div v-for="(answer, index) in shuffledAnswers" :key="index" class="answers">
      <button @click="selectAnswer(index)" :class="submitClass(index)">{{answer}}</button>
    </div>
    <div class="actions">
      <button :disabled="index >= 9" id="next" @click="skip">Skip</button>
      <button id="submit" @click="submitAnswer" :disabled="submitted">Submit</button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Question",
  props: {
    currentQuestion: Object,
    next: Function,
    index: Number,
    increment: Function
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      correctIndex: null,
      submitted: false
    };
  },
  computed: {
    answers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      return answers;
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.submitted = false;
        this.shuffleAnswers();
      }
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    skip() {
      this.next();
      this.increment(false);
    },
    submitAnswer() {
      let isCorrect = false;

      if (this.correctIndex === this.selectedIndex) {
        isCorrect = true;
      }
      this.submitted = true;

      this.increment(isCorrect);
      setTimeout(() => {
        if (this.index < 9) {
          this.next();
        }
      }, 2000);
    },
    submitClass(index) {
      let submit = "answer";
      if (this.submitted && this.correctIndex === index) {
        submit = "answer correct";
      } else if (
        this.submitted &&
        this.selectedIndex !== this.correctIndex &&
        this.selectedIndex === index
      ) {
        submit = "answer wrong";
      }

      return submit;
    }
  }
};
</script>

<style scoped>
.quiz p {
  font-weight: bold;
}

.quiz .answers {
  display: flex;
  flex-direction: column;
}

.quiz .answers .answer {
  margin-bottom: 10px;
}

.quiz .actions {
  display: flex;
  justify-content: space-between;
}

.quiz .actions button {
  display: inline;
  width: 100px;
  color: #fff;
  border: none;
  padding: 0.6em 0.6em;
  border-radius: 50px;
}

.quiz .actions button:focus {
  outline: none;
}

#submit {
  background: #637af0;
}

#submit:disabled {
  background: #637af06c !important;

  cursor: not-allowed;
}

#submit:hover {
  background: #637af0de;
}

#next {
  background: #159827;
}

#next:disabled {
  background: #1598264d !important;
  cursor: not-allowed;
}

#next:hover {
  background: #159826d2;
}
.correct {
  background: #acdfba;
  border: 1px solid #acdfba;
}

.wrong {
  background: #ee8787;
  border: 1px solid #ee8787;
  color: #fff;
}

@media (max-width: 600px) {
  .quiz .actions {
    justify-content: center;
  }

  #submit {
    margin-left: 10px;
  }
}
</style>