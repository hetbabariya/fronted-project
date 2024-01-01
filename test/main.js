// Asynchronous

const getData = ()=>{
    let i = 5;
    return new Promise((resolve) =>{

        const id = setInterval (()=>{
            console.log(i);
            i--;
            if(i==0)
            {
                clearInterval(id);
                resolve();
            }
        },1000);
    })
}



async function fun(){
    await getData();
    await getData();
}

fun();