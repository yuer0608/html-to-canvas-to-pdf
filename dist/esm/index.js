import I from"html2canvas";import{jsPDF as R}from"jspdf";function x(o,p,f){let m=o[f],t=o.offsetParent;for(;t!==p;)m+=t[f],t=t.offsetParent;return m}var r={width:595.28,height:841.89};function b(o,p){return new Promise((f,m)=>{let t=document.createElement("div");t.style.position="absolute",t.style.zIndex="-1",t.style.top="0",t.style.margin="auto",t.style.width="895px",t.style.padding="20px",t.style.color="rgb(34, 47, 62)",t.style.fontFamily="Helvetica, Arial, sans - serif",t.innerHTML=o,document.appendChild(t);let C=t.offsetHeight,w=t.offsetWidth;I(t,{scrollY:-window.scrollY,windowWidth:w,windowHeight:C,logging:!0,letterRendering:1,allowTaint:!1,useCORS:!0}).then(d=>{let y=d.width,H=d.height,P=y/r.width*r.height,g=H,h=0,L=r.width,T=r.width/y*H,W=d.toDataURL("image/jpeg",1),n=new R({orientation:"p",unit:"pt",format:"a4"}),E=[...t.getElementsByTagName("a")].map(e=>{let{offsetWidth:i,offsetHeight:s,href:l}=e,c=x(e,t,"offsetTop"),a=x(e,t,"offsetLeft"),u=r.width/w,D=u*a,j=u*c,v=u*i,G=u*s;return{href:l,offsetWidth:i,offsetHeight:s,left:a,top:c,currLeft:D,currTop:j,currWidth:v,currHeight:G}});if(g<P)n.addImage(W,"JPEG",0,0,L,T),E.forEach(e=>{let{href:i,currLeft:s,currTop:l,currWidth:c,currHeight:a}=e;n.link(s,l,c,a,{url:i})});else for(;g>0;)n.addImage(W,"JPEG",0,h,L,T),g-=P,E?.filter(e=>e.currTop>-h&&e.currTop<r.height-h)?.forEach(e=>{let{href:i,currLeft:s,currTop:l,currWidth:c,currHeight:a}=e;n.link(s,l+h,c,a,{url:i})}),h-=r.height,g>0&&n.addPage();n.save(`${p}.pdf`,{returnPromise:!0}).then(()=>(document.removeChild(t),f(""),"")).catch(()=>{})}).catch(d=>{})})}var Y=o=>`Hello ${o}`;export{Y as Greeter,b as downLoadPdf};
