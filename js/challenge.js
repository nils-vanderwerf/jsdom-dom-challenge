


document.addEventListener('DOMContentLoaded', function(){

    let count = 0;
    const countDisplay = document.getElementById('counter');
    
    const buttons = document.querySelectorAll('button');
    const pauseBtn = document.getElementById('pause');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    const heart = document.getElementById('heart');
    const commentBtn = document.getElementById('submit');

    function addListComments() {
        let listContainer = document.getElementById('list');
        let ul = document.createElement('ul');
        console.log(ul);
        listContainer.appendChild(ul);
    }

    addListComments();
    

    plus.addEventListener('click', increment);
    minus.addEventListener('click', decrement);

    let likedNumbers = {};

//Function to stop/start timer
    function outerTimer () {
        function timer() {
            count++;
            countDisplay.textContent = count;

        }

        let controlTimer;

        return {
            start() {
                controlTimer = setInterval(timer, 1000);
            },
            pause() {
                clearInterval(controlTimer);
            }
        }
    }
    function increment() {
        count+= 1;
        countDisplay.textContent = count;
    }

    function decrement() {
        count -= 1;
        countDisplay.textContent = count;
    }
    function likeThisNumber() {
        let thisNumber = assignKey(likedNumbers, count); 
        let faveNumberList = document.getElementById('list');
        let likedNumber = document.createElement('li');
        likedNumber.textContent = `${count} has been liked ${thisNumber} times`;
        faveNumberList.appendChild(likedNumber);
    }

    function assignKey(obj, key) {
        typeof obj[key] === 'undefined' ? obj[key] = 1 : obj[key]++;
        return obj[key];
    }

    //Invokes timer function so it can be controlled by the pause button
    let pauseMe = outerTimer();

    //tracks whether timer is paused
    let isPaused = false;

    pauseBtn.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if (!isPaused) {
            pauseMe.pause();
            pauseBtn.textContent ="resume";
            buttons.forEach(function (element) {
               element.disabled = true;
            });
            this.disabled =false;
            heart.disabled=false;
            isPaused=true;
        } else {
            buttons.forEach(function (element) {
                element.disabled = false;
             });
            pauseMe.start();
            pauseBtn.textContent ="pause";
            isPaused=false;
        }
    });
    heart.addEventListener('click', likeThisNumber);
    pauseMe.start();

    commentBtn.addEventListener('click', function(){
        event.preventDefault();
        event.stopPropagation();
        let userComment = document.getElementById('comment-input');
        
        if (userComment.value == '') {
            alert('Nothing has been entered');
        } else {
            let li = document.createElement('li');
            let liNode = document.createTextNode(userComment.value);

            let ul = document.querySelector('#list ul');
            li.appendChild(liNode);
            ul.appendChild(li);

            //clear text field for future input
            userComment.value = '';

        }
    });

});
