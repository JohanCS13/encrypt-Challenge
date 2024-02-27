// definición de variables



let content = document.getElementById("content");

// La regex permite letras minúsculas y espacios, pero no es necesario el uso de + ya que queremos permitir texto vacío

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

// function asignarTextoElemento(elemento, texto) {
//     let elementoHTML = document.querySelector(elemento);
//     elementoHTML.innerHTML = texto;
//     return;
// }

function validateText() {
    let texto = content.value.trim();
    let regex = /^[a-z\s]*$/; // Permitir solo letras minúsculas y espacios
    let advertencia = document.getElementById("warningText");
    let submitButton = document.getElementById("encrypter");
    let submitDecrypter = document.getElementById("decrypter");
    // let submitButtonDe = document.getElementById("decrypt");

    
    if (!texto.match(regex)) {
        submitButton.disabled = true;
        submitDecrypter.disabled = true;
        advertencia.textContent = "¡Solo se permiten letras minúsculas y espacios!";
    } else {
      advertencia.textContent = ""; // Limpiar advertencia si el texto es válido
      submitButton.disabled = false;
      submitDecrypter.disabled = false;
    }
  }

  // Esta función se llama cuando se hace clic en el botón "Encriptar"
  function encrypt() {
    // Obtiene el texto del textarea y elimina los espacios en blanco al principio y al final
    const text = document.getElementById("content").value.trim();
    // Verifica si el campo de texto está vacío
    if (text === "") {
        alert("Por favor, ingresa un mensaje para encriptar.");
        return;
    }

    const mapping = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const encryptedText = text.replace(/[aeiou]/gi, match => mapping[match.toLowerCase()] || match);

    displayResult(encryptedText);
}

function decrypt() {
    const text = document.getElementById("content").value.trim();
    if (text === "") {
        alert("Por favor, ingresa un mensaje para desencriptar.");
        return;
    }

    const mapping = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    const decryptedText = text.replace(/(enter|imes|ai|ober|ufat)/gi, match => mapping[match] || match);

    displayResult(decryptedText);
}



function displayResult(resultText) {
    document.getElementById("result").textContent = resultText;
    document.getElementById("result").style.display = "block"; // Mostrar el resultado
    document.querySelector(".text__copy").style.display = "block";
    document.querySelector(".message__text").style.display = "none";
    document.querySelector(".text__img-find").style.display = "none"; // Ocultar la imagen
    document.querySelector(".text__copy").disabled = false; // Habilitar el botón de copiar
}

function copyText() {
    const resultText = document.getElementById("result").textContent;
    
    navigator.clipboard.writeText(resultText)
        .then(() => {
            showNotification("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
            showNotification("Hubo un error al copiar el texto al portapapeles");
        });
}

function showNotification(message) {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000); // Duración de la notificación (en milisegundos)
}
window.onload = function() {
    document.getElementById("content").value = ""; // Borra el contenido del textarea al cargar la página
};