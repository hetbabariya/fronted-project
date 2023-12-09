let boxes = document.querySelectorAll(".box");
let winbox = document.getElementById('winDisplay');
let reset = document.getElementById('reset');
let displaymsg = document.getElementById('displaymsg');
let newgameBtn = document.getElementById('newGame');
let drawEle = document.getElementById('draw');
let url = "./click_sound.wav"

let turnX = true;
let draw = true;

let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box) =>{
    box.addEventListener('click',()=>{

        if (turnX){
            box.innerHTML = "X";
            audioplay(url);
            turnX = false;
            box.setAttribute("disabled" , '');
            winner();
        }
        else
        {
            audioplay(url);
            box.innerHTML = "O";
            turnX = true;
            box.setAttribute("disabled" , '');
            winner();
        }

    });
});


let adddisabled = () =>{
    boxes.forEach((box) =>{
        box.disabled = true;
    });
}

let removeDisable = () =>{
    boxes.forEach((box) =>{
        box.disabled = false;
        box.innerText = '';
        displaymsg.style.display = 'none'
        drawEle.style.display = "none";
        draw = true;
        winbox.classList.remove('hide')
    });
}


let displayWinermsg = (pos) =>{
    displaymsg.style.display = "flex";
    winbox.innerText = `Congratulations ! Winner ${pos}`
}

let audioplay = (url)=>{
    new Audio(url).play();
}

let winner = () =>{
    
    for(let i of win)
    {
        let position1 = boxes[i[0]].innerText;
        let position2 = boxes[i[1]].innerText;
        let position3 = boxes[i[2]].innerText;

        if (position1 != '' && position2 != '' && position3 != '')
        {
            if(position1 === position2 && position2 === position3)
            {
                displayWinermsg(position1);
                adddisabled();
                draw = false;
                console.log("hi");

            }
        } 
    }
    checkDraw();
};

let checkDraw = () =>{
    let count = 0;
    boxes.forEach((box) =>{
        let value = box.innerText;
        if (value == '')
        {
            count++;
        }
    });

    if(count == 0 && draw == true)
    {
        drawEle.style.display = "block";
    }
};



reset.addEventListener('click',()=>{
    winbox.classList.add('hide');
    removeDisable();
    

});

newgameBtn.addEventListener('click',()=>{
    displaymsg.style.display = "none";
    winbox.classList.add('hide');
    removeDisable();
});