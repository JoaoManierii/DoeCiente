function gerarQRCode() {
    // Obtenha a chave PIX através de uma solicitação fetch
    fetch('sua-api-que-retorna-a-chave-pix')
        .then(response => response.json())
        .then(data => {
            const chavePix = data.chave; // Substitua 'chave' pelo nome da propriedade que contém a chave na resposta da API

            // Obtenha o valor fornecido pelo usuário
            const valor = document.getElementById('valor').value;

            // Construa o payload PIX
            const payload = "00020101021126520041" + chavePix + "52040000" + valor + "5303";
            const crc16 = crc16CCITT(payload);
            const payloadCompleto = payload + "6304" + crc16;

            // Crie o QR Code
            const qrcode = new QRCode(document.getElementById("qrcode"), {
                text: payloadCompleto,
                width: 256,
                height: 256
            });
        })
        .catch(error => console.error('Erro ao obter a chave PIX:', error));
}

// Função para calcular o CRC16-CCITT de uma string hexadecimal
function crc16CCITT(str) {
    var crc = 0xFFFF;
    var j, i;

    for (i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c > 255) {
            throw new RangeError();
        }
        for (j = 0; j < 8; j++) {
            crc ^= (c & 0x01) << 15;
            c >>= 1;
            if (crc & 0x01) {
                crc = (crc >> 1) ^ 0x8408;
            } else {
                crc >>= 1;
            }
        }
    }

    return ("0000" + crc.toString(16)).slice(-4);
}