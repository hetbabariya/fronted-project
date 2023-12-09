let search_box = document.getElementById('search-box');
let search_icon = document.getElementById('search-icon');
let get_display;
    
search_icon.addEventListener('click',()=>{
    get_display = window.getComputedStyle(search_box).display
    if (get_display == 'block')
    {
        search_box.style.display = 'none';
    }
    else
    {
        search_box.style.display = 'block';
    }
});
