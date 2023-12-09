let progress = document.getElementsByClassName('progress');
let progressLine = document.getElementsByClassName('progressJoinLine');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let iter = 0;

let nextAttr = nextBtn.getAttribute('disabled');
let prevAttr = prevBtn.getAttribute('disabled');

document.getElementById('nextBtn').addEventListener('click',()=>{
    if(iter >= 0 && iter < 4){
        progress[iter].classList.add('active');
        if(iter >= 0 && iter < 3) {progressLine[iter].classList.add('activeJoin'); }
        iter++;
    }

    if(iter == 4)
    {
        nextBtn.setAttribute('disabled','');
    }

    if(prevAttr != 'null')
    {
        prevBtn.removeAttribute('disabled');
    }
});

document.getElementById('prevBtn').addEventListener('click',()=>{
    if(iter > 0 && iter <= 4){
        iter--;
        progress[iter].classList.remove('active');
        if(iter >= 0 && iter < 3) {progressLine[iter].classList.remove('activeJoin'); }
    }


    if(nextAttr != 'null')
    {
        nextBtn.removeAttribute('disabled');
    }

    if(iter == 0)
    {
        prevBtn.setAttribute('disabled','');
    }
});

