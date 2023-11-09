function Question(text, options, correct) {
    this.text = text;
    this.options = options;
    this.correct = correct;
    this.checkQuestion = function(answer) {
        if (answer == this.correct) {
            return true;
        } else {
            return false;
        }
    }
}

let questions = [
    new Question("'document.write' kodu ne işe yarar?", {a: "Konsola mesaj yazdırır.", b: "Uyarı penceresi açar.", c: "Sayfaya yazı yazdırır."}, "c"),
    new Question("'document.getElementById()' kodu ne işe yarar?", {a: "ID'den element bulur.", b: "Class'dan element bulur.", c: "Uyarı penceresi açar."}, "a"),
    new Question("Fonksiyon nasıl oluştururlur?", {a: "document.querySelector()", b: "function testFunc() {}", c: "document.getElementsByClassName()"}, "b")
]