
let fs = require('fs')
let path = require('path')
const log = require('../utils/log')

let Files = {}

function onStart(socket, data) {
    let Name = data['Name'];
    Files[Name] = { //Create a new Entry in The Files Variable
        FileSize: data['Size'],
        Data: "",
        Downloaded: 0
    }
    let Place = 0
    let tfname=path.join(__dirname,'../temp/' + Name)
    try {
        let Stat = fs.statSync(tfname)
        if (Stat.isFile()) {
            Files[Name]['Downloaded'] = Stat.size
            Place = Stat.size / 524288
            log.debug(Name, "have data:", Stat.size)
        }
    } catch (er) {
        log.debug(Name, "is new")
    } //It's a New File
   fs.open(tfname, 'a',7*64+7*8+5, function (err, fd) {
      if (err) {
        log.error(err)
      } else {
      //  Files[Name]={}
        log.debug(Name," created!")
        Files[Name]['Handler'] = fd //We store the file handler so we can write to it later
        Files[Name]['Downloaded'] = 0
        socket.emit('MoreData', {
           Place,
           Percent: 0
        })
      }
    })



}
function onUpload(socket, data) {
    let Name = data['Name'];
     let tfname=path.join(__dirname,'../temp/' + Name)
    Files[Name]['Downloaded'] += data['Data'].length;
    Files[Name]['Data'] += data['Data'];
    log.debug(Files[Name]['Downloaded'])
    if (Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
    {
        fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
            let inp = fs.createReadStream(tfname)
            inp.on("end", function () {
                fs.unlink(tfname, function () { //This Deletes The Temporary File
                    //exec("ffmpeg -i Video/" + Name  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg Video/" + Name  + ".jpg", function(err){
                    //		socket.emit('Done', {'Image' : 'Video/' + Name + '.jpg'});
                    //	});
                    socket.emit('Done', { 'Image': '/OK.jpg' });

                })
            })
             let fname=path.join(__dirname,'../upload/' + Name)
            let out = fs.createWriteStream(fname)
            inp.pipe(out)
        })
    } else if (Files[Name]['Data'].length > 10485760) { //If the Data Buffer reaches 10MB
        fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
            Files[Name]['Data'] = ""; //Reset The Buffer
            let Place = Files[Name]['Downloaded'] / 524288;
            let Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100
            socket.emit('MoreData', {
                'Place': Place,
                'Percent': Percent
            })
        })
    } else {
        let Place = Files[Name]['Downloaded'] / 524288
        let Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100
        socket.emit('MoreData', {
            'Place': Place,
            'Percent': Percent
        })
    }
}

exports.start = (io) => {
    log.info('Starting socket.io upload service')
    io.sockets.on('connection', function (socket) {
        socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
            onStart(socket, data)
        })
        socket.on('Upload', function (data) {
            onUpload(socket, data)
        })
    })
}
