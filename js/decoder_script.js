document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("decodeButton").addEventListener("click", function() {
        var fileInput = document.getElementById("fileInput");
        if (!fileInput.files || !fileInput.files[0]) {
            alert("Please select a file.");
            return;
        }
        
        var file = fileInput.files[0];
        var reader = new FileReader();
        
        reader.onload = function(event) {
            var decodedText = decodeText(event.target.result);
            document.getElementById("output").value = decodedText;
        };
        
        reader.readAsText(file);
    });
});

function decodeText(encodedText) {
    // Define your decoding logic here
    // For this example, let's reverse the encoding process
    var decodingDict = {
        '0000000': '0', '0000001': '1', '0000010': '2', '0000011': '3',
        '0000100': '4', '0000101': '5', '0000110': '6', '0000111': '7',
        '0001000': '8', '0001001': '9', '0001010': 'a', '1001010': 'A',
        '0001011': 'b', '1001011': 'B', '0001100': 'c', '1001100': 'C',
        '0001101': 'd', '1001101': 'D', '0001110': 'e', '1001110': 'E',
        '0001111': 'f', '1001111': 'F', '0010000': 'g', '1010000': 'G',
        '0010001': 'h', '1010001': 'H', '0010010': 'i', '1010010': 'I',
        '0010011': 'j', '1010011': 'J', '0010100': 'k', '1010100': 'K',
        '0010101': 'l', '1010101': 'L', '0010110': 'm', '1010110': 'M',
        '0010111': 'n', '1010111': 'N', '0011000': 'o', '1011000': 'O',
        '0011001': 'p', '1011001': 'P', '0011010': 'q', '1011010': 'Q',
        '0011011': 'r', '1011011': 'R', '0011100': 's', '1011100': 'S',
        '0011101': 't', '1011101': 'T', '0011110': 'u', '1011110': 'U',
        '0011111': 'v', '1011111': 'V', '0100000': 'w', '1100000': 'W',
        '0100001': 'x', '1100001': 'X', '0100010': 'y', '1100010': 'Y',
        '0100011': 'z', '1100011': 'Z', '1111111': ' ',  // Space decoding
        '0100100': '!', '1100100': '?', '0100101': '.', ',1100101': ','
    };

    // Split the encoded text into binary strings representing each character
    var encodedChars = encodedText.trim().split('\n');

    // Decode each binary string and concatenate the decoded characters
    var decodedText = '';
    encodedChars.forEach(function(encodedChar) {
        var decodedChar = decodingDict[encodedChar];
        if (decodedChar !== undefined) {
            decodedText += decodedChar;
        } else {
            console.error("Invalid binary sequence '" + encodedChar + "' found. Exiting...");
            return "";
        }
    });

    return decodedText;
}
