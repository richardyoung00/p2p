let peer
let conn

const myPeerIdEl = document.querySelector("#my-peer-id")
const connectIdEl = document.querySelector("#connect-id")
const connectButtonEl = document.querySelector("#connect-button")

function generateId(length = 6) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function connect(connectId) {
    console.log("connecting to " + connectId)
    conn = peer.connect(connectId);
    console.log("done")
    initialiseConnection()
}

function initialiseConnection() {
    console.log("setup connection")
    conn.on('open', function () {
        console.log("Connection open")
        conn.send('Hello!');
    });

    conn.on('data', function (data) {
        console.log('Received', data);
    });

    conn.send('Hello from');

}

async function init() {
    console.log('init')

    const id = generateId()
    myPeerIdEl.innerText = id

    peer = new Peer(id, {
        host: '192.168.0.126',
        port: 9000,
        path: '/myapp'
    });
    console.log(peer)

    peer.on('open', function (id) {
        console.log('Connection to server established. ID is: ' + id);
    });

    peer.on('error', function (err) {
        console.log('Error: ', err);
    });

    peer.on('connection', function (connection) {
        conn = connection
        console.log('Connection from peer recieved');
        initialiseConnection()
    });

    connectButtonEl.addEventListener('click', () => {
        const connectId = connectIdEl.value
        connect(connectId)
    })

}

init().catch(console.error)