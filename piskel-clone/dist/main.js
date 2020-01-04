!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let a,o,s=128;function c(e){s=e,canvas.height=e,canvas.width=e,function(e){document.getElementById("size32").classList.remove("active"),document.getElementById("size64").classList.remove("active"),document.getElementById("size128").classList.remove("active"),document.getElementById(`size${e}`).classList.add("active")}(e);const t=localStorage.getItem("canvas"),n=new Image;n.crossOrigin="Anonymous",n.src=t,n.onload=function(){b.drawImage(n,0,0,512/(512/s),512/(512/s))}}function l(e){let t=e.slice(4,e.length-1);return t=t.split(", "),`#${((1<<24)+(+t[0]<<16)+(+t[1]<<8)+ +t[2]).toString(16).slice(1)}`}let d=[];function i(){let e=document.createElement("canvas");o=e.getContext("2d"),d.push(e),g&&(o=g);let t=document.createElement("div"),n=document.createElement("button"),a=document.createElement("button");t.classList.add("frame"),n.textContent="duplicate",n.classList.add("duplicate"),a.textContent="delete",a.classList.add("delete"),e.style.width="128px",e.style.height="128px",e.width="128",e.height="128",t.appendChild(e),t.appendChild(n),t.appendChild(a),document.getElementById("addFrames").append(t)}function r(){v&&(o=v);const e=localStorage.getItem("canvas"),t=new Image;t.crossOrigin="Anonymous",t.src=e,o.drawImage(t,0,0,128,128)}function m(){b.clearRect(0,0,512,512),o.clearRect(0,0,128,128),b.fillStyle="lightgrey",b.fillRect(0,0,512,512),localStorage.setItem("canvas",canvas.toDataURL())}function u(e){document.getElementById("pencil").classList.remove("active"),document.getElementById("paintBucket").classList.remove("active"),document.getElementById("chooseColor").classList.remove("active"),document.getElementById("eraser").classList.remove("active"),document.getElementById("stroke").classList.remove("active"),document.getElementById("bucket").classList.remove("active"),document.getElementById(`${e}`).classList.add("active")}let g,v,I=0;function y(){const e=document.getElementById("animation").getContext("2d"),t=d[I].toDataURL(),n=new Image;n.crossOrigin="Anonymous",n.src=t,n.onload=function(){e.drawImage(n,0,0,256,256),I+=1,I===d.length&&(I=0)}}n.d(t,"color",(function(){return k})),n.d(t,"ctx",(function(){return b})),n.d(t,"ctxValue",(function(){return v})),n.d(t,"canvasData",(function(){return g}));let f=!1,E=!1,p=!1,B=!1,L=!1,h=!1,S=!1,w=!1,k="#ff0000";const C=document.getElementById("canvas");C.style.width="512px",C.style.height="512px";const b=C.getContext("2d");if(b.imageSmoothingEnabled=!1,i(),r(),localStorage.getItem("canvas")){const e=localStorage.getItem("canvas"),t=new Image;t.crossOrigin="Anonymous",t.src=e,t.onload=function(){b.strokeStyle=k,b.drawImage(t,0,0,128,128)}}let $,R;document.getElementById("size").addEventListener("click",e=>{const{target:t}=e;"size32"===t.id&&c(32),"size64"===t.id&&c(64),"size128"===t.id&&c(128)}),document.getElementById("mainItems").addEventListener("click",e=>{E=!1,L=!1,B=!1,h=!1,S=!1,f=!1;const{target:t}=e,n=t.closest("div");"main__items"!==n.className&&("pencil"===n.id&&(u("pencil"),E=!0),"paintBucket"===n.id&&(u("paintBucket"),B=!0),"chooseColor"===n.id&&(u("chooseColor"),L=!0),"eraser"===n.id&&(u("eraser"),h=!0),"stroke"===n.id&&(u("stroke"),S=!0),"bucket"===n.id&&(u("bucket"),f=!0))}),document.getElementById("canvas").addEventListener("mousedown",e=>{if(E){b.strokeStyle=k,b.beginPath();const t=e.offsetX,n=e.offsetY;b.moveTo(parseInt(t/(512/s)),parseInt(n/(512/s))),p=!0}}),document.getElementById("canvas").addEventListener("mousemove",e=>{if(p){const t=e.offsetX,n=e.offsetY;b.lineTo(parseInt(t/(512/s)),parseInt(n/(512/s))),b.stroke()}}),document.getElementById("canvas").addEventListener("mouseup",()=>{p=!1,localStorage.setItem("canvas",C.toDataURL())}),document.getElementById("canvas").addEventListener("mousemove",()=>{r(),v=null,localStorage.setItem("canvas",C.toDataURL())}),document.getElementById("canvas").addEventListener("mouseleave",()=>{p=!1,localStorage.setItem("canvas",C.toDataURL())}),document.getElementById("canvas").addEventListener("mousedown",e=>{if(E){const t=e.offsetX,n=e.offsetY;b.strokeStyle=k,b.fillStyle=k,b.fillRect(parseInt(t/(512/s)),parseInt(n/(512/s)),1,1),localStorage.setItem("canvas",C.toDataURL())}}),document.addEventListener("keydown",(function(e){"KeyB"===e.code&&(document.getElementById("paintBucket").classList.add("active"),document.getElementById("pencil").classList.remove("active"),document.getElementById("chooseColor").classList.remove("active"),document.getElementById("canvas").classList.remove("pencil"),document.getElementById("canvas").classList.remove("choose-color"),document.getElementById("canvas").classList.add("paint-bucket")),"KeyC"===e.code&&(document.getElementById("chooseColor").classList.add("active"),document.getElementById("canvas").classList.add("choose-color"),document.getElementById("paintBucket").classList.remove("active"),document.getElementById("pencil").classList.remove("active"),document.getElementById("canvas").classList.remove("pencil"),document.getElementById("canvas").classList.remove("paint-bucket")),"KeyP"===e.code&&(document.getElementById("pencil").classList.add("active"),document.getElementById("canvas").classList.add("pencil"),document.getElementById("paintBucket").classList.remove("active"),document.getElementById("chooseColor").classList.remove("active"),document.getElementById("canvas").classList.remove("choose-color"),document.getElementById("canvas").classList.remove("paint-bucket"))})),document.getElementById("clear").addEventListener("click",m),document.getElementById("mainColors").addEventListener("click",e=>{const{target:t}=e,n=t.closest("div");"main__colors"!==n.className&&(n.classList.add("active"),"primaryColor"===n.id&&(document.getElementById("secondaryColor").classList.remove("active"),k=document.getElementById("inputColorPrimary").value),"secondaryColor"===n.id&&(document.getElementById("primaryColor").classList.remove("active"),k=document.getElementById("inputColorSecondary").value))}),document.getElementById("canvas").addEventListener("click",e=>{L&&(!function(e){const t=e.offsetX,n=e.offsetY,o=b.getImageData(t/(parseInt(canvas.style.width,10)/s),n/(parseInt(canvas.style.height,10)/s),1,1).data,c=`rgb(${o[0]}, ${o[1]}, ${o[2]})`;console.log(o);let d=l(c);document.getElementById("primaryColor").classList.contains("active")?document.getElementById("inputColorPrimary").value=d:document.getElementById("inputColorSecondary").value=d,a=d}(e),k=a)}),document.getElementById("inputColorPrimary").addEventListener("input",()=>{k=document.getElementById("inputColorPrimary").value}),document.getElementById("inputColorSecondary").addEventListener("input",()=>{k=document.getElementById("inputColorSecondary").value}),document.getElementById("canvas").addEventListener("click",e=>{B&&function(e){let t=parseInt(canvas.style.width)/s,n=e.offsetX,a=e.offsetY;const o=b.getImageData(parseInt(n/(parseInt(canvas.style.width,10)/s)),parseInt(a/(parseInt(canvas.style.height,10)/s)),1,1).data,c=l(`rgb(${o[0]}, ${o[1]}, ${o[2]})`),d=[],i={};for(d.push([n,a]),b.fillStyle=k;d.length>0;){const e=d.pop(),n=e[0],a=e[1];if(!0===i[`${n} ${a}`])continue;i[`${n} ${a}`]=!0;const o=b.getImageData(parseInt(n/(parseInt(canvas.style.width,10)/s)),parseInt(a/(parseInt(canvas.style.height,10)/s)),1,1).data;l(`rgb(${o[0]}, ${o[1]}, ${o[2]})`)===c&&(b.fillRect(parseInt(n/(parseInt(canvas.style.width,10)/s)),parseInt(a/(parseInt(canvas.style.height,10)/s)),1,1),512!==n&&!0!==i[`${+n+t} ${a}`]&&d.push([+n+t,a]),0!==n&&!0!==i[`${+n-t} ${a}`]&&d.push([+n-t,a]),512!==a&&!0!==i[`${n} ${+a+t}`]&&d.push([n,+a+t]),0!==a&&!0!==i[`${n} ${+a-t}`]&&d.push([n,+a-t]))}localStorage.setItem("canvas",canvas.toDataURL())}(e)}),document.getElementById("canvas").addEventListener("mousedown",e=>{h&&(w=!0)}),document.getElementById("canvas").addEventListener("mousemove",e=>{const t=e.offsetX,n=e.offsetY;w&&(b.clearRect(parseInt(t/(512/s)),parseInt(n/(512/s)),1,1),localStorage.setItem("canvas",C.toDataURL()),r())}),document.getElementById("canvas").addEventListener("mouseup",()=>{w=!1}),document.getElementById("canvas").addEventListener("mouseleave",()=>{w=!1});let x=!1;document.getElementById("canvas").addEventListener("mousedown",e=>{S&&($=e.offsetX,R=e.offsetY,x=!0)}),document.getElementById("canvas").addEventListener("mousemove",e=>{const t=e.offsetX,n=e.offsetY;if(x){b.strokeStyle=k,b.clearRect(0,0,C.width,C.height);const e=localStorage.getItem("canvas"),a=new Image;a.crossOrigin="Anonymous",a.src=e,b.drawImage(a,0,0,s,s),b.beginPath(),b.moveTo(parseInt($/(512/s)),parseInt(R/(512/s))),b.lineTo(parseInt(t/(512/s)),parseInt(n/(512/s))),b.stroke()}}),document.getElementById("canvas").addEventListener("mouseup",e=>{S&&(x=!1)}),document.getElementById("addNewFrame").addEventListener("click",()=>{i(),m(),localStorage.setItem("canvas",C.toDataURL())}),document.getElementById("addFrames").addEventListener("click",e=>{let t=e.target;if(t.closest("canvas")){v=t.getContext("2d");const e=t.toDataURL(),n=new Image;n.crossOrigin="Anonymous",n.src=e,n.onload=function(){b.drawImage(n,0,0,128,128)}}}),document.getElementById("addFrames").addEventListener("click",e=>{let t=e.target;if(t.classList.contains("delete")){d.splice(d.filter(e=>e.getContext("2d")===t.previousSibling.previousSibling.getContext("2d")),1),t.closest(".frame").style.display="none";const e=document.getElementsByTagName("canvas")[0].toDataURL();v=document.getElementsByTagName("canvas")[0].getContext("2d");const n=new Image;n.crossOrigin="Anonymous",n.src=e,n.onload=function(){b.strokeStyle=k,b.drawImage(n,0,0,128,128)},r()}if(t.classList.contains("duplicate")){i();const e=t.previousSibling.toDataURL(),n=new Image;n.crossOrigin="Anonymous",n.src=e,n.onload=function(){b.strokeStyle=k,b.drawImage(n,0,0,128,128)},localStorage.setItem("canvas",C.toDataURL()),r(),v=null,g=null}}),document.getElementById("canvas").addEventListener("mousedown",()=>{f&&(!function(e){b.fillStyle=e,b.fillRect(0,0,512,512),localStorage.setItem("canvas",canvas.toDataURL())}(k),r())});let D=12;document.getElementById("value").value="12 fps";let U=1e3/D,O=setInterval(y,U);document.getElementById("range").addEventListener("input",()=>{document.getElementById("value").value=`${document.getElementById("range").value} fps`,D=document.getElementById("range").value,U=1e3/D,clearInterval(O),0!=D&&(O=setInterval(y,U))}),document.getElementById("animation").addEventListener("click",(function(){if("fullscreenEnabled"in document){if(document.fullscreenEnabled){let e=document.getElementById("animation");"requestFullscreen"in e&&e.requestFullscreen()}}else alert("User doesn't allow full screen")})),window.onunload=()=>{localStorage.setItem("canvas",C.toDataURL())}}]);
//# sourceMappingURL=main.js.map