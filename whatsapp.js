const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startBot() {
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;

        if (qr) {
            console.log("Scan this QR code to connect:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("✅ WhatsApp bot is connected!");
        }
    });

    sock.ev.on("creds.update", saveState);
}

startBot();
