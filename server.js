var schedule = require('node-schedule');
var log      = require('simple-node-logger').createSimpleLogger();
var config   = require('./config')
var path     = require('path')
var express  = require('express');
var app      = express();

// Main process that takes pictures
var job = schedule.scheduleJob(config.time, snap_photo);

function snap_photo() {
    const exec = require('child_process').exec;
    const command = 'imagesnap ' + config.path + '/$(date +%y%m%d%H%M%S).png'
    const child = exec(command,
        (error, stdout, stderr) => {
            if (stderr !== '') {
                log.debug("STDERR: " + stderr);
            }
            if (stdout !== '') {
                log.debug("STDOUT: " + stdout);
            }
            if (error !== null) {
                log.error("EXEC ERROR: " + error);
            }
    });
}

// Declare static photos dir
app.use('/snaps', express.static('snaps'));

// API endpoints
app.get('/latest', function (req, res) {

    // Get list of images
    var file_list = [];
    walkSync('./snaps', function(file, stat) {
      file_list.push({
        name: file.split('/')[1],
        stat: stat
      });
    });

    // Save latest image
    var last_img = file_list[file_list.length-1];

    // Send HTTP response
    res.send({
      "time": last_img.stat.birthtime,
      "path": 'http://localhost:3000/snaps/' + last_img.name
    });

  function walkSync(currentDirPath, callback) {
    var fs = require('fs');
    var path = require('path');

    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
  }
});

app.get('/view/latest', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Start web server
app.listen(3000, function () {
  console.log('Monitoring app started. View photos at http://localhost:3000');
});
