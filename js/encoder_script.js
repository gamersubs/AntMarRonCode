document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("encodeButton").addEventListener("click", function() {
        var inputText = document.getElementById("textInput").value;
        var fileName = prompt("Please enter a filename (without extension):");
        if (!fileName) {
            alert("Invalid filename. Please enter a valid filename.");
            return;
        }
        var encodedText = encodeText(inputText);
        var downloadLink = createDownloadLink(encodedText, fileName);
        document.getElementById("output").appendChild(downloadLink);
    });

    document.getElementById("copyButton").addEventListener("click", function() {
        var encodedText = document.getElementById("output").innerText;
        copyToClipboard(encodedText);
    });
});

function encodeText(text) {
    // Define encoding dictionary
    var encodingDict = {
        '0': '0000000', '1': '0000001', '2': '0000010', '3': '0000011',
        '4': '0000100', '5': '0000101', '6': '0000110', '7': '0000111',
        '8': '0001000', '9': '0001001', 'a': '0001010', 'A': '1001010',
        'b': '0001011', 'B': '1001011', 'c': '0001100', 'C': '1001100',
        'd': '0001101', 'D': '1001101', 'e': '0001110', 'E': '1001110',
        'f': '0001111', 'F': '1001111', 'g': '0010000', 'G': '1010000',
        'h': '0010001', 'H': '1010001', 'i': '0010010', 'I': '1010010',
        'j': '0010011', 'J': '1010011', 'k': '0010100', 'K': '1010100',
        'l': '0010101', 'L': '1010101', 'm': '0010110', 'M': '1010110',
        'n': '0010111', 'N': '1010111', 'o': '0011000', 'O': '1011000',
        'p': '0011001', 'P': '1011001', 'q': '0011010', 'Q': '1011010',
        'r': '0011011', 'R': '1011011', 's': '0011100', 'S': '1011100',
        't': '0011101', 'T': '1011101', 'u': '0011110', 'U': '1011110',
        'v': '0011111', 'V': '1011111', 'w': '0100000', 'W': '1100000',
        'x': '0100001', 'X': '1100001', 'y': '0100010', 'Y': '1100010',
        'z': '0100011', 'Z': '1100011', ' ': '1111111',  // Space encoding
        '!': '0100100', '?': '1100100', '.': '0100101', ',': '1100101'
    };

    var encodedText = '';
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        var encodedChar = encodingDict[char];
        if (encodedChar !== undefined) {
            encodedText += encodedChar + '\n';  // Add newline after each character
        } else {
            console.error("Invalid character '" + char + "' found. Exiting...");
            return "";
        }
    }
    return encodedText;
}

function createDownloadLink(text, fileName) {
    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.antmarron';  // Append .antmarron extension
    link.innerText = 'Download Encoded File';
    return link;
}

function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert("Raw binary text copied to clipboard!");
}
