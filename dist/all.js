function popUp(){const n=document.getElementById("overlay"),e=document.querySelector(".btn"),t=document.getElementsByClassName("close")[0];e.onclick=function(){n.style.display="block"},t.onclick=function(){n.style.display="none"},window.onclick=function(e){e.target==n&&(n.style.display="none")}}popUp();const btn=document.querySelector(".btn"),infoClick=document.querySelector(".info-click"),el=document.createElement("span");let counter=0;function elementClick(){if(counter++,infoClick.innerText=counter+" times",5<=counter&&btn.removeEventListener("click",elementClick),5==counter){el.classList.add("element"),el.innerText="Reset Now!";const e=document.querySelector(".btn-reset");e.appendChild(el)}}btn.addEventListener("click",elementClick);