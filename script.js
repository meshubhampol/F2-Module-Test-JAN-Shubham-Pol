let images = document.getElementsByTagName('img');
let form = document.getElementById('form');

let text=document.getElementById('firstprompt');

images[0].addEventListener('click',showForm);

function showForm() {
    text.innerHTML='';
    images[0].classList.add('unselectable');
    form.classList.remove('hidden');
}

let register = document.getElementById('submit-btn');

register.addEventListener('click',saveData);

let data=[];

let inputs=document.getElementsByTagName('input');
let success=document.getElementById('success');

function saveData(e) {
    e.preventDefault();
    if(checkValidity()) {
        data.push({
            name: inputs[0].value,
            email: inputs[1].value,
            username: inputs[2].value
        })

        form.classList.add('hidden');
        success.classList.remove('hidden');
        images[1].classList.remove('unselectable');
    }
}

let error=document.getElementsByClassName('error');

function checkValidity() {
    let name=inputs[0].value;
    name=name.trim();
    let email=inputs[1].value;
    let username=inputs[2].value;
    username=username.trim();

    if(name.length>0 && email.includes('@') && username.length>0) {
        error[0].innerHTML='';
        error[1].innerHTML='';
        error[2].innerHTML='';
        return true;
    }
    else {
        if(name.length==0) {
            error[0].innerHTML='Name must contain at least one character!';
            inputs[0].value='';
        }
        else {
            error[0].innerHTML='';
        }

        if(!email.includes('@')) {
            error[1].innerHTML='email should be correct!'
            inputs[1].value='';
        }
        else {
            error[1].innerHTML='';
        }

        if(username.length==0) {
            error[2].innerHTML='Username must contain at least one character!'
            inputs[2].value='';
        }
        else {
            error[2].innerHTML='';
        }

        return false;
    }
}

images[1].addEventListener('click',showData);

let info = document.getElementById('info');

function showData() {
    images[1].classList.add('unselectable');
    images[2].classList.remove('unselectable');
    success.classList.add('hidden');
    info.innerHTML='Name: '+ data[0].name + '<br> <br>' + 'Username: ' + data[0].username + 
                '<br> <br> Click On Image 3 to Roll The Dice';
}

let promptSec=document.getElementById('prompt-section');

images[2].addEventListener('click',showDice);

let dice = document.getElementById('dice');
let diceSec=document.getElementById('dice-section');
let curRoll=document.getElementById('curRoll');
let score=document.getElementById('score');
let attempt=document.getElementById('attempt');

function showDice() {
    images[2].classList.add('unselectable');
    info.classList.add('hidden');
    diceSec.classList.remove('hidden');
    promptSec.className='';
    promptSec.classList.add('hidden');
    dice.classList.add('dice1');
}

let chance=2;
let count=3;
let sum=0;

let success2=document.getElementById('success2');

dice.addEventListener('click',rollDice);

function rollDice() {
    let ran;
    if(count>0) {
        ran=parseInt( (Math.random()*6) + 1);
        sum+=ran;
        count--;
        updateScore(ran);
    }
    if(count===0) {
        if(sum>10) {
           images[3].classList.remove('unselectable');
           chance=0;
           diceSec.classList.add('hidden');
           success2.classList.remove('hidden');
        }
        else {
            chance--;
        }
    }
    if(chance===0) {
        attempt.classList.add('warning');
        attempt.innerHTML='Bad luck';
        dice.classList.add('unselectable');
    }
    else if(count==0 && chance>0) {
        count=3;
        sum=0;
        diceSec.classList.add('hidden');
        promptSec.classList.remove('hidden');
        images[2].classList.remove('unselectable');
        attempt.innerHTML='Rolls Left: ' + count;
        score.innerHTML='Score: ' + sum;
        curRoll.innerHTML='Current Roll: 0';
    }
}

function updateScore(ran) {
    curRoll.innerHTML='Current Roll: '+ ran;
    score.innerHTML='Score: ' + sum;
    attempt.innerHTML='Rolls Left: ' + count;
    dice.classList.add('animation');
    dice.className='';
    dice.classList.add('dice' + ran);
    dice.classList.add('diceRoll');
}

images[3].addEventListener('click',showCoupon);

let coupon = document.getElementById('coupon');
let couponSec= document.getElementById('coupon-section');

function showCoupon() {
    images[3].classList.add('unselectable');
    let s='';
    for(let i=0;i<12;i++) {
        let ran=parseInt(Math.random()*10);
        s+=ran;
    }

    coupon.innerHTML='Coupon Code: ' + s;
    success2.classList.add('hidden');
    couponSec.classList.remove('hidden');
    couponSec.classList.add('congrats-section');
}

