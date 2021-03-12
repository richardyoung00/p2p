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
    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
            console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!');
    });
}

async function init() {
    console.log('init')

    const id = generateId()
    myPeerIdEl.innerText = id

    peer = new Peer(id);
    console.log(peer)

    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
    });
    
    peer.on('error', function (err) {
        console.log('Error: ', err);
    });
    
    peer.on('connection', function () {
        console.log('Connection established');
    });

    connectButtonEl.addEventListener('click', () => {
        const connectId = connectIdEl.value
        connect(connectId)
    })

}

init().catch(console.error)