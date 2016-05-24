// Path where photos are saved
exports.path = '/Volumes/Other/pi-cam/snaps'

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
