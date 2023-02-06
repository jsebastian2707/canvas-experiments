/*ref:
https://www.w3.org/2015/04/2dcontext-lc-sample.html#pixel-manipulation
*/
var canvas = document.querySelector("#canvas");;
var ctx = canvas.getContext("2d");;
var imageData=ctx.createImageData(canvas.width,canvas.height);
var bandera=1;
var option= document.querySelector("form").firstElementChild;
var nucleo={
   x:343.5,
   y:316.5
}

var pixel = {
    r:135, //red 
    g:53, //green
    b:53, //blue 
    a:255, //alpha
    ramdomizar: function(){
        this.r=Math.random()*256 |0; 
        this.g=Math.random()*256 |0;
        this.b=Math.random()*256 |0;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getnucleo(){
    nucleo={ x:(imageData.width/2), y:(imageData.height/2) }
}

window.onload = () => {
    resizecanvas();
    getnucleo();
    dibujar[6]();
    canvas.onclick = function(event){
        console.log(angulo(event.clientX,event.clientY));
    }
}

window.onresize = () =>{
    getnucleo();
    resizecanvas();
}

function resizecanvas(){
    canvas.width=window.innerWidth-1;
    canvas.height=window.innerHeight-4;
    imageData=ctx.createImageData(canvas.width,canvas.height);
}


//0) esperar 1) estado normal //2) finalizar
//actualizar pasa la variable a 2
//dibujar la deja en 0;
//esto es por que dibujar es asincrono y no sabes del todo cuando pare la ejecucion
async function actualizar(event){
    event.preventDefault();
    bandera=2;
    while(bandera!=0){
        await sleep(1);
    }
    console.log("consuelo de una muerte");
    bandera=1;
    dibujar[event.target.firstElementChild.selectedIndex]();
}

//tenemos dos puntos el centro y los del parametro, retornamos la hipotenusa 
function pitagoras(x,y){
    return (Math.sqrt(Math.pow((nucleo.x)-x,2)+Math.pow((nucleo.y)-y,2)));
}

//funcion angulo de un respecto el centro
function angulo(x,y){
    if(x>(nucleo.x)){
        if(y<(nucleo.y)){
            return Math.asin((nucleo.y-y)/pitagoras(x,y))*(180/Math.PI); 
        }else{
            return 360+Math.asin((nucleo.y-y)/pitagoras(x,y))*(180/Math.PI);
        }
    }else{
        return 180-(Math.asin((nucleo.y-y)/pitagoras(x,y))*180/Math.PI);
    }
}

//adaptacion para geogebra 
/*
If(x>0),If(y>0,Math.asin(x/pitagoras(x,y))*180/Math.PI,Math.asin(x/pitagoras(x,y))*180/π+360),180-(Math.asin(x/pitagoras(x,y))*180/))
*
If(getYcoord(C)<-getYcoord(A)){
        If(getXcoord(C)>getXcoord(A)){
            Z= Math.asin((getYcoord(C)-getYcoord(A))/pitagoras(x,y))*(180/Math.PI);
        }else{
            Z= (Math.asin((getYcoord(C)-getYcoord(A))/pitagoras(x,y))*180/Math.PI)+360;
        }
    }else{
        z= 180-(Math.asin((getYcoord(C)+getYcoord(A))/pitagoras(x,y))*180/Math.PI)
}

If(x(C)>x(A),Math.asin((getYcoord(C)-getYcoord(A))/pitagoras(x,y))*(180/Math.PI),Math.asin((getYcoord(C)-getYcoord(A))/pitagoras(x,y))*180/Math.PI)+360)

If(y(C) > y(A), If(x(C)>x(A),(asin(getYcoord(C)-getYcoord(A))/pitagoras(x,y))*(180/Math.PI),Math.asin((getYcoord(C)-getYcoord(A))/pitagoras(x,y))*180/Math.PI)+360), 200)
*/
var k=0;

let dibujar = [
    async function (){
        while (bandera==1) {
            for (let i = 0; i < imageData.data.length; i++) {
                if(i%3==0){
                    imageData.data[i] = 200+(Math.random()*55);
                }else if((i+1)%3==0){
                    imageData.data[i] = Math.random()*255;
                }else{
                    imageData.data[i] = (Math.random()*55);
                }
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(20);
        }
        bandera=0;
    },
    async function (){
        while (bandera==1) {
            for (let i = 0; i < imageData.data.length; i++) {
                if(i%3==0){
                    imageData.data[i] = 20+(Math.random()*55);
                }else if((i+1)%3==0){
                    imageData.data[i] = (Math.random()*215);
                }else{
                    imageData.data[i] = 20+(Math.random()*55);
                }
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(20);
        }
        bandera=0;
    },
    //en esta parte del codigo me di cuenta de que por pixel a hay 4 bits 
    //pero ni idea de que significan cada valor
    async function (){
        while (bandera==1) {
            for (let i = 0; i < imageData.data.length; i++) {
                if((i+3)%4==0){
                    imageData.data[i] = 255;
                }else if((i+2)%4==0){
                    imageData.data[i] = 255;
                }else if((i+3)%4==0){
                    imageData.data[i] = 0;
                }else{
                    imageData.data[i] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(20);
        }
        bandera=0;
    },
    // por fin leyendo la documentacion encontre el formato de color 
    //rojo
    async function (){
        while (bandera==1) {
            for (let i = 0; i < imageData.data.length; i++) {
                if((i+3)%4==0){
                    imageData.data[i] = 0;
                }else if((i+2)%4==0){
                    imageData.data[i] = 0;
                }else if((i+1)%4==0){
                    imageData.data[i] = 255;//// este pirobo no me genera cambios...  tenia un error
                }else{
                    imageData.data[i] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(20);
        }
        bandera=0;
    },
    // ahora voy a tratar de generar un gradiante
    //primero se necesitan dos colores
    //el gradiante va ser de izq a der
    //no hize el gradiante pero encontre algo superchulo en internet
    
    async function (){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        console.log(pixel2);
        console.log(pixel3);
        while (bandera==1) {
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    imageData.data[(i*imageData.width*4)+(j*4)]   = pixel2.r + (pixel3.r-pixel2.r)*j/imageData.width;
                    imageData.data[(i*imageData.width*4)+(j*4)+1] = pixel2.g + (pixel3.g-pixel2.g)*j/imageData.width;
                    imageData.data[(i*imageData.width*4)+(j*4)+2] = pixel2.b + (pixel3.b-pixel2.b)+j/imageData.width;
                    imageData.data[(i*imageData.width*4)+(j*4)+3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            pixel2.ramdomizar();
            await sleep(40);
        }
        bandera=0;
    },
    //leve optimizacion
    async function (){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        while (bandera==1) {
            let rdifference=(pixel3.r-pixel2.r)/imageData.width;
            let gdifference=(pixel3.g-pixel2.g)/imageData.width;
            let bdifference=(pixel3.b-pixel2.b)/imageData.width;
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    imageData.data[(i*imageData.width*4)+(j*4)]   = pixel2.r + (rdifference * j);
                    imageData.data[(i*imageData.width*4)+(j*4)+1] = pixel2.g + (gdifference * j);
                    imageData.data[(i*imageData.width*4)+(j*4)+2] = pixel2.b + (bdifference * j);
                    imageData.data[(i*imageData.width*4)+(j*4)+3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            pixel3.ramdomizar();
            await sleep(40);
        }
        bandera=0;
    },
    async function (){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        while (bandera==1) {
            let rdifference=((pixel3.r-pixel2.r)*3)/imageData.width;
            let gdifference=((pixel3.g-pixel2.g)*3)/imageData.width;
            let bdifference=((pixel3.b-pixel2.b)*3)/imageData.width;
            for (let Y = 0; Y < imageData.height; Y++) {
                for (let X = 0; X < (imageData.width); X++) {
                    let cor=(Y*imageData.width*4)+(X*4);
                    let pit=pitagoras(X,Y);
                    if(Math.cos((pit+k)/2)>0){
                        imageData.data[cor]   = 250;
                        imageData.data[cor+1] = 3;
                        imageData.data[cor+2] = 30;
                        imageData.data[cor+3] = 255;                    
                    }else{  
                        imageData.data[cor]   = pixel2.r + (rdifference * pit);
                        imageData.data[cor+1] = pixel2.g + (gdifference * pit);
                        imageData.data[cor+2] = pixel2.b + (bdifference * pit);
                        imageData.data[cor+3] = 255;
                    }
                }
            }
            k++;
            if(k>78){
                k=16;
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(0);
        }
        bandera=0;
    },
    async function(){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        console.log(pixel2);
        console.log(pixel3);
        while (bandera==1) {
            let rdifference=((pixel3.r-pixel2.r)*3)/imageData.width;
            let gdifference=((pixel3.g-pixel2.g)*3)/imageData.width;
            let bdifference=((pixel3.b-pixel2.b)*3)/imageData.width;
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    let cor=(i*imageData.width*4)+(j*4);
                    let ang=angulo(j,i);
                    let pit=pitagoras(j,i);
                    //if(Math.sin((ang+k)/4*(180/Math.PI))>0){  -----> devuelven patrones chidos
                    //if(Math.sin((ang+k)*(180/Math.PI))>0){
                    if(Math.sin((((ang+k)*Math.PI)/18))>0){
                        imageData.data[cor]   = 250;
                        imageData.data[cor+1] = 3;
                        imageData.data[cor+2] = 30;
                        imageData.data[cor+3] = 255;                    
                    }else{  
                        imageData.data[cor]   = pixel2.r + (rdifference * pit);
                        imageData.data[cor+1] = pixel2.g + (gdifference * pit);
                        imageData.data[cor+2] = pixel2.b + (bdifference * pit);
                        imageData.data[cor+3] = 255;
                    }
                }
            }
            k++;
            if(k>36){
                k=0;
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(0);
        }
        bandera=0;
    },
    async function(){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        console.log(pixel2);
        console.log(pixel3);
        while (bandera==1) {
            let rdifference=((pixel3.r-pixel2.r)*3)/imageData.width;
            let gdifference=((pixel3.g-pixel2.g)*3)/imageData.width;
            let bdifference=((pixel3.b-pixel2.b)*3)/imageData.width;
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    let cor=(i*imageData.width*4)+(j*4);
                    let ang=angulo(j,i);
                    let pit=pitagoras(j,i);
                    if(Math.sin(((ang+k)*180/Math.PI))>0){
                        imageData.data[cor]   = 250;
                        imageData.data[cor+1] = 3;
                        imageData.data[cor+2] = 30;
                        imageData.data[cor+3] = 255;                    
                    }else{  
                        imageData.data[cor]   = pixel2.r + (rdifference * pit);
                        imageData.data[cor+1] = pixel2.g + (gdifference * pit);
                        imageData.data[cor+2] = pixel2.b + (bdifference * pit);
                        imageData.data[cor+3] = 255;
                    }
                }
            }
            k++;
            if(k>36){
                k=0;
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(0);
        }
        bandera=0;
    },
    async function(){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        console.log(pixel2);
        console.log(pixel3);
        while (bandera==1) {
            let rdifference=((pixel3.r-pixel2.r)*3)/imageData.width;
            let gdifference=((pixel3.g-pixel2.g)*3)/imageData.width;
            let bdifference=((pixel3.b-pixel2.b)*3)/imageData.width;
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    let cor=(i*imageData.width*4)+(j*4);
                    let ang=angulo(j,i);
                    let pit=pitagoras(j,i);
                    if(Math.sin(ang*Math.PI/18)>0 ^ Math.cos(1000/10+((pit+k+10)/18))>0){
                        imageData.data[cor]   = 250;
                        imageData.data[cor+1] = 3;
                        imageData.data[cor+2] = 30;
                        imageData.data[cor+3] = 255;                    
                    }else{  
                        imageData.data[cor]   = pixel2.r + (rdifference * pit);
                        imageData.data[cor+1] = pixel2.g + (gdifference * pit);
                        imageData.data[cor+2] = pixel2.b + (bdifference * pit);
                        imageData.data[cor+3] = 255;
                    }
                }
            }
            k++;
            if(k>1000){
                k=0;
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(0);
        }
        bandera=0;
    },
    async function(){
        const pixel2= Object.create(pixel);
        const pixel3= Object.create(pixel);
        pixel2.ramdomizar();  
        pixel3.ramdomizar();
        console.log(pixel2);
        console.log(pixel3);
        while (bandera==1) {
            let rdifference=((pixel3.r-pixel2.r)*3)/imageData.width;
            let gdifference=((pixel3.g-pixel2.g)*3)/imageData.width;
            let bdifference=((pixel3.b-pixel2.b)*3)/imageData.width;
            for (let i = 0; i < imageData.height; i++) {
                for (let j = 0; j < (imageData.width); j++) {
                    let cor=(i*imageData.width*4)+(j*4);
                    let ang=angulo(j,i);
                    let pit=pitagoras(j,i);
                    if(Math.sin(ang*Math.PI/18)>0 ^ Math.sin((((10)/((1000/10+((pit+k+10)/18))+2)))^(2)+2+(1000/10+((pit+k+10)/18)))>0){
                        
                        imageData.data[cor]   = 250;
                        imageData.data[cor+1] = 3;
                        imageData.data[cor+2] = 30;
                        imageData.data[cor+3] = 255;                    
                    }else{  
                        imageData.data[cor]   = pixel2.r + (rdifference * pit);
                        imageData.data[cor+1] = pixel2.g + (gdifference * pit);
                        imageData.data[cor+2] = pixel2.b + (bdifference * pit);
                        imageData.data[cor+3] = 255;
                    }
                }
            }
            k++;
            if(k>1000){
                k=0;
            }
            ctx.putImageData(imageData, 0, 0);
            await sleep(0);
        }
        bandera=0;
    }
]

