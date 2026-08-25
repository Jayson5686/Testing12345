// FAQ accordion - show/hide answers when a question is clicked
document.addEventListener("DOMContentLoaded", function () {
    var questions = document.querySelectorAll(".faq-question");

    for (var i = 0; i < questions.length; i++) {
        questions[i].addEventListener("click", function () {
            var item = this.parentElement;
            var wasOpen = item.classList.contains("open");

            // close all
            var allItems = document.querySelectorAll(".faq-item");
            for (var j = 0; j < allItems.length; j++) {
                allItems[j].classList.remove("open");
            }

            // reopen only if it was closed
            if (!wasOpen) {
                item.classList.add("open");
            }
        });
    }
});
