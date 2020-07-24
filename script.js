async function main(e){
    e.preventDefault();
    let handNames=await parseText();
    const cardDB=await apiCall();
    hand = cardDB.filter(element =>{
       return handNames.includes(element.Title);
    })
    //console.log(hand);
    buildDisplayCards(hand);
}

async function parseText(){
    //let matchStatus="(\| [A-Za-z ]+\([ADU]\:[12]\))g";
    let matchStatus=/([\|][ ][A-Za-z ]+[\(][ADU][\:][12][\)])/g;
    let str=document.getElementById("input").value;
    let hand=str.match(matchStatus);
    hand.forEach((card, i)=>{
        hand[i]=card.substr(2,card.length-8);
    });
    return hand;
}

async function apiCall() {
    let res = await fetch("https://scene.eldertaleonline.com/api/cards.json");
    return res.json();
  }

async function showHand(){
    
}

async function buildDisplayCards(hand){
    hand.forEach(card =>{
        let entry = document.createElement("li");
        entry.className = "card blue-grey white-text";
        entry.innerHTML = JSON.stringify(card);
        let div = document.getElementById("hand");
        div.appendChild(entry);
    })
}