<template>
  <div>
    <div v-if="questions.length" class="quiz-modal">
      <router-link to="/">Go Back</router-link>
      <Progress :numTotal="numTotal" :numCorrect="numCorrect"></Progress>
      <div class="quiz">
        <p v-html="index+1 + '. ' + currentQuestion.question"></p>
        <div v-for="(answer, index) in shuffledAnswers" :key="index" class="answers">
          <button @click="selectAnswer(index)" :class="submitClass(index)" v-html="answer"></button>
        </div>
        <div class="actions">
          <button :disabled="index >= 9 || submitted" id="next" @click="skip">Skip</button>
          <button
            id="submit"
            @click="submitAnswer"
            :disabled="submitted || selectedIndex === null"
          >Submit</button>
        </div>
      </div>
    </div>
    <div v-else class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Progress from "./Progress.vue";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "Question",
  components: { Progress },
  props: {
    difficulty: String
  },
  data() {
    return {
      questions: [],
      index: 0,
      selectedIndex: null,
      shuffledAnswers: [],
      correctIndex: null,
      submitted: false
    };
  },
  mounted() {
    this.$store.dispatch("getQuestions", this.difficulty).then(() => {
      this.questions = this.$store.state.questions;
      this.$store.dispatch("resetDefault");
    });
  },
  computed: {
    answers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      return answers;
    },
    currentQuestion() {
      return this.questions[this.index];
    },
    ...mapGetters(["numTotal", "numCorrect"])
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        if (this.questions.length) {
          this.selectedIndex = null;
          this.submitted = false;
          this.shuffleAnswers();
        }
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
    increment(isCorrect) {
      if (isCorrect) {
        this.$store.dispatch("incrementNumCorrect");
      }
      this.$store.dispatch("incrementNumTotal");
    },
    skip() {
      this.next();
      this.increment(false);
    },
    next() {
      this.index++;
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
        } else {
          this.$router.push("/result");
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
      } else if (!this.submitted && this.selectedIndex === index) {
        submit = "answer selected";
      }

      return submit;
    }
  }
};
</script>

<style scoped>
.quiz p {
  font-weight: bold;
  font-size: 1.1em;
}

.quiz .answers {
  display: flex;
  flex-direction: column;
}

.quiz .answers .answer {
  margin-bottom: 10px;
  font-size: 1em;
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
  padding: 15px;
  font-size: 1em;
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

.selected {
  background: #d0e2dd;
  border: 1px solid #d0e2dd;
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