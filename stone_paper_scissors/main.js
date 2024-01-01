const user_choice = document.querySelectorAll('.choice')
const player1_choice_img = document.getElementById('user_choice_img')
const player1_choice_txt = document.getElementById('user_choice_txt')
const computer_choice_img = document.getElementById('computer_img')
const computer_choice_txt = document.getElementById('computer_txt')
const player1Score = document.getElementById('scorer1')
const player2Score = document.getElementById('scorer2')
const result = document.getElementById('msg')
const next_round_Btn = document.getElementById('StartBtn')
const colseOnModel = document.getElementById('close-icon')
const modelContainer = document.getElementById('model-container')
const userEnterName = document.getElementById('userName')
const player1name = document.getElementById('username')
const RoundDis = document.querySelector('#roundnum')
const userEnterRound = document.getElementById('roundPlay')
const playBtn = document.getElementById('playBtn')
const ResetBtn = document.getElementById('ResetGame')
const NewGameBtn = document.getElementById('NewGame')
const player1_name = document.getElementById('player1_name')
const player2_name = document.getElementById('player2_name')
const mainContainer = document.querySelector('.container')
const winnerNewGameBtn = document.getElementById('WinNewGame')
const winnerResetBtn = document.getElementById('WinResetGame')
const winnerSec = document.getElementById('winner-sec')
const winnerPlayer = document.getElementById('winnerPlayer')
const main_sound = "./stone_paper_scissor_sound.wav"

let user_choice_element_img = '<img src="./img/rock.png" alt="" id="rock">', user_choice_element_txt = "Rock";
let playIN = 3;
let player1Point = 0;
let player2Point = 0;
let round;
let roundInc = 0;
let user1;
let printRoundIntervalId;
let reset = false;

// disable pop-up model
const disableModel = ()=>{
  modelContainer.style.display = 'none';
  mainContainer.style.filter = 'blur(0px)';
}

const disableStartBtn = () =>{
  next_round_Btn.setAttribute('disabled','');
}

const enableStartBtn = () => {
  next_round_Btn.removeAttribute('disabled');
}

// playbtn
playBtn.addEventListener('click',()=>{
  RoundDis.innerHTML = roundInc;
  player1name.innerHTML = userEnterName.value;
  player1_name.innerHTML = userEnterName.value;
  if (userEnterName.value.match(/^[A-Za-z0-9]+$/) && userEnterRound.value.match(/^([1-9]|1[0-9]|20)$/))
  {
    disableModel();
  }
  else {
    window.alert("Please Enter Name and Number of Rounds");
  }

  round = userEnterRound.value;
  user1 = userEnterName.value;
})

// user choice
user_choice.forEach((ele) => {
    ele.addEventListener('click' , ()=>{
        user_choice_element_img = ele.innerHTML;
        user_choice_element_txt = ele.id;
        removeClickedEffect();
        addClickedEffect(ele);
    })
});

// round display
const RoundDisaply = ()=>{
  RoundDis.innerHTML = roundInc;
}


// clicked effect
const removeClickedEffect = ()=>{
  for(let ele = 0 ; ele <= 2 ; ele++)
  {
    if (user_choice[ele].classList.contains('clicked'))
    {
      user_choice[ele].classList.remove('clicked');
    }
  }
};

// add clicked effect
const addClickedEffect = (ele)=>{
  ele.classList.add('clicked');
};

// get random number
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

// play audio
const audioplay = (main_sound)=>{
    new Audio(main_sound).play();
};


// check result
const checkResult = (userChoice , computerChoice)=>{
  
  if(userChoice == computerChoice ) 
  {
    result.innerHTML = "Draw";
  }
  else if ( (userChoice == "rock" && computerChoice == "scissor") || 
            (userChoice == "paper" && computerChoice == "rock")|| 
            (userChoice == "scissor" && computerChoice == "paper"))
  {
    result.innerHTML = ` ${user1} Wins`;
    player1Point++;
    player1Score.innerHTML = player1Point;
  } 
  else
  {
    result.innerHTML = "Computer Wins";
    player2Point++;
    player2Score.innerHTML = player2Point;
  }


};


// display choice
const displayChoiceAndResult = ()=>{
  let randomNum = getRandomArbitrary(0,2);
  let computer_RNDchoice_img = user_choice[randomNum].innerHTML;
  let computer_RNDchoice_txt = user_choice[randomNum].id;
  //display computer choice image and text
  player1_choice_img.innerHTML = user_choice_element_img;
  player1_choice_txt.innerHTML = user_choice_element_txt;
  computer_choice_img.innerHTML = computer_RNDchoice_img;
  computer_choice_txt.innerHTML = computer_RNDchoice_txt;

  checkResult(user_choice_element_txt , computer_RNDchoice_txt );
};


// print round
const printRound = (id) => {
    return new Promise((resolve) => {
      next_round_Btn.innerHTML = `Game Start in ${playIN}`;
      playIN--;
      
      if (playIN < 0) {
        next_round_Btn.innerHTML = `Stone Paper Scissor`;
        audioplay(main_sound);
        displayChoiceAndResult();
        roundInc++;
        RoundDisaply();
        clearInterval(id);
        resolve();
        playIN = 3;
      }
    });
  };
  

// set funtion
const setIntervalFun = () => {
  return new Promise((resolve) => {
    let printRoundIntervalId = setInterval(async () =>{
      await printRound(printRoundIntervalId);
      setTimeout(()=>{
        resolve();
      },2000);
    }, 1000);
  });

};
  
// start round  
next_round_Btn.addEventListener('click',async () => {
  disableStartBtn();
  for(let i = 1 ; i <= round ; i++)
  {
    if(reset == true) break;
    await setIntervalFun();
  }
  checkWinner();
});



// reset game
const ResetGame = ()=>{
  roundInc = 0;
  player1Point = 0;
  player2Point = 0;
  RoundDis.innerHTML = 0;
  player1Score.innerHTML = 0;
  player2Score.innerHTML = 0;
  next_round_Btn.innerHTML = 'Start'
  result.innerHTML = '------------';
  removeClickedEffect();
  enableStartBtn();
};

ResetBtn.addEventListener('click',()=>{
  reset = true;
  ResetGame();
});

NewGameBtn.addEventListener('click',()=>{
  window.location.reload();
});


// winner
const enableWinner = ()=>{
  winnerSec.style.display = 'flex';
}

const disableWinner = ()=>{
  winnerSec.style.display = 'none';
}

winnerResetBtn.addEventListener('click',()=>{
  disableWinner();
  ResetGame();
})

winnerNewGameBtn.addEventListener('click',()=>{
  disableWinner();
  window.location.reload();
})


const checkWinner = ()=>{
  enableWinner();
  if(player1Point == player2Point)
  {
    winnerPlayer.innerHTML = `Match is Draw`;
  }
  else if(player1Point > player2Point)
  {
    winnerPlayer.innerHTML = `Winner is ${userEnterName.value}`;
  }
  else{
    winnerPlayer.innerHTML = `Winner is Computer`;
  }
}