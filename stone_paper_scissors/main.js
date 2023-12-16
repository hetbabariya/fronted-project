const user_choice = document.querySelectorAll('.choice')
const player1_choice_img = document.getElementById('user_choice_img')
const player1_choice_txt = document.getElementById('user_choice_txt')

user_choice.forEach((ele) => {
    ele.addEventListener('click' , ()=>{
        let element_img = ele.innerHTML
        let element_txt = ele.id

        player1_choice_img.innerHTML = element_img;
        player1_choice_txt.innerHTML = element_txt;
    })
});
