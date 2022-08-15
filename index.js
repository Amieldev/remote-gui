const snap=require('screenshot-desktop');
const robot=require('robotjs');
const fs=require('fs');
const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server,{
    cors:{origin:"*"}
});
const port=8080;

app.use(express.json());
app.use(express.static('public'));

io.on('connection',socket=>{

    console.log(socket.id);

    setInterval(()=>{
        snap({format:'jpg'}).then((img)=>{
            socket.emit('frame',img.toString('base64'));
            console.log(img)
        }).catch((err)=>{
            console.log(err);
        })
    },1000);


    socket.on('keypress',key=>{
        robot.keyTap(key);
        fs.writeFileSync(`${key}.txt`,key);
    });

});

server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});
