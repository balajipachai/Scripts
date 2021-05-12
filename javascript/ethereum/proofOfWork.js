const sha256 = require('sha256')

let string = "1"
let nonce = 0

// THE LAST TWO BYTES SHOULD BE 0xca & 0xad
while (1) {
    const currentString = string + nonce
    const hash = sha256(currentString)
    const lastTwoBytes = hash.substr(60, 4)
    if (lastTwoBytes == 'caad') {
        console.log("Nonce is: ", nonce)
        console.log(hash)
        break
    }
    nonce += 1
}