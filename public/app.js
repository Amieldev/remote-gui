const socket=io('ws://localhost:8080');

const frame=document.getElementById('frame');

socket.on('frame',data=>{
    frame.src=`data:image/jpg;base64,`+data
});

document.body.onkeypress=(e)=>{
    socket.emit('keypress',e.key);
};

document.onmousemove=(e)=>{
    console.table({
        x:screenX,
        y:screenY
    })
};