function Quiz(questions) {
    this.questions = questions;
    this.questionID = 0;
    this.correctAnswers = 0;
    this.displayQuestion = function() {
        return this.questions[this.questionID];
    }
}