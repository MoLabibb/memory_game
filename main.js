let duration = 1000;
let blocksContainer = document.querySelector('.container');
let blocks = document.querySelectorAll('.game-block');
let time  = document.querySelector('#time span');
let startBtn = document.querySelector('.play')
let coverDiv = document.querySelector('.start');
let orderRange = [...Array(blocks.length).keys()] 
var intervalId ; 

shuffle(orderRange);

startBtn.onclick = ()=>{
    
    blocks.forEach(e =>{
        e.classList.remove('has-match')
        e.classList.remove('is-flipped')
    })


    coverDiv.style.display = 'none';
    time.innerHTML = 60 ; 
    if(intervalId){
        clearInterval(intervalId);
    }
    intervalId = setInterval(timer, duration);
}
let timer  = ()=>{
    time.innerHTML -= 1 ;
    check();
}
let check = ()=>{
    x = 0 ; 
    blocks.forEach(e =>{
        if(e.classList.contains('has-match')){
            x++;
        }else{
            return ; 
        }
    })
    if (x == blocks.length ){
        coverDiv.style.display = 'flex';
        clearInterval(intervalId);
        startBtn.innerHTML = 'good job ' ;
        setTimeout(() => {
            window.location.reload(); 
        }, 3000);
    } else if (x !== blocks.length &&  time.innerHTML != 0  ){
        return
    }else if(x !== blocks.length &&  time.innerHTML == 0){
        coverDiv.style.display = 'flex';
        clearInterval(intervalId);
        startBtn.innerHTML = 'bad luck, try again' ;
        setTimeout(() => {
            window.location.reload(); 
        }, 3000);
    }

}


blocks.forEach((block, index)=>{
    block.style.order = orderRange[index];
    block.addEventListener('click', function(){
        flipBlock(block);
    });
})

function flipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');
    let flippedblocks = [];
    blocks.forEach((e)=>{
        if(e.classList.contains('is-flipped')){
            flippedblocks.push(e);
        }
        
    })
    if(flippedblocks.length === 2){
        stopSelection();
        checkmatch(flippedblocks[0], flippedblocks[1]);

    }
    
}
function stopSelection(){
    blocksContainer.classList.add('no-clicking')
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);

}

function checkmatch(firstBlock, secondBlock){
    let tries  = document.querySelector('.tries strong');

    if( firstBlock.dataset.id === secondBlock.dataset.id){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');        
    }else{

        tries.innerHTML = parseInt(tries.innerHTML) + 1; 

        setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        }, duration);

    }


}

function shuffle(array){
    let current = array.length;
    let temp;
    let random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random]  = temp;
    }
}
