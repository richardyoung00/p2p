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

async function connect(connectId) {
    console.log("connecting to " + connectId)
    conn = peer.connect(connectId);
    console.log("done")
    await initialiseConnection()
}

async function initialiseConnection() {
    console.log("setup connection")

    await new Promise((resolve, reject) => {
        conn.on('open', function () {
            console.log("Connection open")
            resolve()
        });
    })


    conn.on('data', function (data) {
        console.log('Received', data);
    });

    conn.send('Hello from ' + peer.id);

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

    peer.on('connection', async function (connection) {
        conn = connection
        console.log('Connection from peer recieved');
        await initialiseConnection()
    });

    connectButtonEl.addEventListener('click', async () => {
        const connectId = connectIdEl.value
        await connect(connectId)
    })

}

init().catch(console.error)