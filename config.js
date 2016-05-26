// Path where photos are saved
exports.path = '/Volumes/Other/pi-cam/snaps'

// Commadn used for snapping pictures (assumes command exists)
// For Mac: imagesnap
// For Raspberry: fswebcam -r 1280x720 --no-banner
exports.cmd = 'fswebcam -r 1280x720 --no-banner'

// Cron style scheduling for taking photos
exports.time = '*/5 * * * * *'
//             * * * * * *
//             ┬ ┬ ┬ ┬ ┬ ┬
//             │ │ │ │ │ |
//             │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
//             │ │ │ │ └───── month (1 - 12)
//             │ │ │ └────────── day of month (1 - 31)
//             │ │ └─────────────── hour (0 - 23)
//             │ └──────────────────── minute (0 - 59)
//             └───────────────────────── second (0 - 59, OPTIONAL)
