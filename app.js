let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const CHANNEL_ACCESS_TOKEN = 'mYcV9f3gijYSinNIkcWlErCYWsP32BmBh7tIm/7DSg5/qmht1cKQiIqbL3Qn6nhpVjm804lR5D36GOpFaptFmCg6FIVThuJs1BiECTWBJMBrUZ7OGAx4OhStl1RF97rhUMgSrqwQVNbY/4fCRWwXjAdB04t89/1O/w1cDnyilFU='
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
    let body=req.body
    let text=body.events[0].message.text
    let replyToken=body.events[0].replyToken
    sendMessage(replyToken,text)
    console.log(JSON.stringify(body,null,2))
    res.send("")
})

// generic function sending messages
function sendMessage(replyToken, text) {
    let body = {
        replyToken,
        messages: [{
            type: 'text',
            text,
        }],
    };

    let options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
