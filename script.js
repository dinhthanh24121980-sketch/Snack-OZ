const prizes=[
{name:"Thẻ máy in",icon:"🖨️"},{name:"Thẻ data Viettel",icon:"📱"},{name:"Thẻ tivi",icon:"📺"},{name:"1 miếng vàng 9999",icon:"🥇"},
{name:"Gối cổ",icon:"🛏️"},{name:"Túi tote",icon:"👜"},{name:"Lót chuột",icon:"🖱️"},{name:"Snack OZ",icon:"🍘"}];
const grid=document.getElementById('prizeGrid');
grid.innerHTML=prizes.map(p=>`<article class="prize"><div class="emoji">${p.icon}</div><b>${p.name}</b><small>Quà tặng OZ</small></article>`).join('');
const wheel=document.getElementById('wheel'),labels=document.getElementById('wheelLabels'),spinBtn=document.getElementById('spinBtn');
const resultName=document.getElementById('resultName'),giftIcon=document.getElementById('giftIcon'),claimForm=document.getElementById('claimForm'),success=document.getElementById('success');
const overlay=document.getElementById('winOverlay'),winPrize=document.getElementById('winPrize'),winIcon=document.getElementById('winIcon');
const segment=45;
const labelAngles=[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5];
labels.innerHTML=prizes.map((p,i)=>`<div class="wheel-label" style="--angle:${labelAngles[i]}deg"><span>${p.name}</span></div>`).join('');
let rotation=0,spinning=false;
function closeWinner(){overlay.hidden=true;document.body.classList.remove('modal-open');}
function showWinner(i){resultName.textContent=prizes[i].name;giftIcon.textContent=prizes[i].icon;winPrize.textContent=prizes[i].name;winIcon.textContent=prizes[i].icon;overlay.hidden=false;document.body.classList.add('modal-open');}
function spin(){
 if(spinning)return; spinning=true; spinBtn.disabled=true; spinBtn.textContent='ĐANG QUAY...'; resultName.textContent='Đang quay...'; giftIcon.textContent='🎁'; success.hidden=true; closeWinner();
 const winner=Math.floor(Math.random()*prizes.length); rotation+=2160+(360-(winner*segment+segment/2)); wheel.style.transform=`rotate(${rotation}deg)`;
 let doneOnce=false; const done=()=>{if(doneOnce)return;doneOnce=true;showWinner(winner);spinBtn.disabled=false;spinBtn.textContent='QUAY LẠI';spinning=false;};
 wheel.addEventListener('transitionend',done,{once:true}); setTimeout(done,4600);
}
document.getElementById('scrollToWheel').addEventListener('click',()=>document.getElementById('game').scrollIntoView({behavior:'smooth',block:'center'}));
spinBtn.addEventListener('click',spin); document.querySelector('.wheel-center').addEventListener('click',spin);
document.getElementById('winClose').addEventListener('click',closeWinner); overlay.addEventListener('click',e=>{if(e.target===overlay)closeWinner();});
document.getElementById('claimPrizeBtn').addEventListener('click',()=>{closeWinner();document.getElementById('resultCard').scrollIntoView({behavior:'smooth',block:'center'});});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeWinner();});
claimForm.addEventListener('submit',e=>{e.preventDefault();success.hidden=false;claimForm.reset();});
