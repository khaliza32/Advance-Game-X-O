const cells =document.querySelectorAll('.cell');
const  resetbtn =document. querySelector('.reset');
const cuurturn =document.querySelector ('.current-turn');
const playscor1 =document.querySelector('.score1');
const playscor2 =document.querySelector('.score2');
const drwscore =document.querySelector('.draw');
const messagecont =document.querySelector('.content')
const overlay =document.getElementById('overlay')
const closebtn =document.getElementById('close')
const wincombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let turn =true;
let usedcelles=[];
let winn =false
let ties=0

let player1={
    Symbol:'<i class="fa fa-close"></i>'  ,
    played:[] ,
    score: 0
}
let player2={
    Symbol:'<i class="fa fa-circle-o"></i>'  ,
    played:[] ,
    score: 0
}
checturn();
for(let i=0 ; i< 9 ;i++){
    cells[i].addEventListener('click', ()=>{
       if(isEmpty(i)){
            if(turn){
                    addsymbol(player1,i);
                   turn=false
                 winner(player1)
                    
                    checturn();
                    }
            else{
                   
                addsymbol(player2,i);
                turn =true    
                winner(player2)                  
                    checturn();
                }
       }else{
        alert('choose an empty cell');

       }


       
        
       
    })
}
function addsymbol(player,i){
    cells[i].innerHTML=player.Symbol;
    player.played.push(i);
    usedcelles.push(i);
}
function winner(player){
    if(!winn){
        wincombos.some(combo=>{
    if(combo.every(index=>player.played.includes(index))){
         winn=true
        player.score++
        showscore ();
        

       setTimeout(showMessage,1000,player,winn )
       reset();
        
    }

  });
    }
    if(!winn && usedcelles.length ==9){
      ties++ ;
      showscore ();
      setTimeout(showMessage,1000 )
    }
  

}
function isEmpty(i){
    if(usedcelles.includes(i)){
        return false;
    }
    return true
}
function reset (){
    cells.forEach(cell=>{
     cell.innerHTML='';
    })
    winn=false
    usedcelles=[];
    player1.played=[];
    player2.played=[];
    turn=true
    checturn();

}
resetbtn.addEventListener('click', reset);
function checturn(){
    if(turn){
     cuurturn.innerHTML=player1.Symbol;
    }else{
        cuurturn.innerHTML=player2.Symbol;

    }
}
function showscore (){
    playscor1.innerHTML=player1.score;
    playscor2.innerHTML=player2.score;
    drwscore.innerHTML=ties;
}

closebtn.addEventListener('click',()=>{
    overlay.style.display='none';
})
function showMessage(player ,winn){
    overlay.style.display='flex'
    if(winn){
         messagecont.innerHTML = player.Symbol + ' is the <h2>winner</h2>';
    }else{
        messagecont.innerHTML =  'it  is a  <h2>Draw</h2>';
    }
   
    reset ();

}