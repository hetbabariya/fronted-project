const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
function move()
{
    let per = 0;
    const display = document.getElementById('display');
    const image = document.getElementById('image');
    const image_blur = window.getComputedStyle(image).filter;

    const intervalId = setInterval( increment , 20)

    function increment()
    {
        if (per == 101){
            clearInterval(intervalId);
        }
        else
        {
            display.innerText = per + "%";
            display.style.opacity = scale(per, 0, 100, 1, 0);
            image.style.filter = `blur(${scale(per, 0, 100, 30, 0)}px)`
            per++;
        }
    }

}


move();