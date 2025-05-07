function mostrarFormulario2() {
    const nombre = document.querySelector('[name="nombre"]');
    const username = document.querySelector('[name="username"]');

    if (nombre.value.trim() === '' || username.value.trim() === '') {
        mostrarError("Por favor, completa todos los campos.");
        return;
    }

    document.getElementById('form1').classList.remove('active');
    document.getElementById('form2').classList.add('active');
}

document.getElementById('form2').addEventListener('submit', function(e) {
    const email = document.querySelector('[name="email"]');
    const password = document.querySelector('[name="password"]');

    if (email.value.trim() === '' || password.value.trim() === '') {
        e.preventDefault();
        mostrarError("Completa tu correo y contraseña.");
    }
});

function mostrarError(mensaje) {
    let errorBox = document.getElementById('error-msg');
    if (!errorBox) {
        errorBox = document.createElement('div');
        errorBox.id = 'error-msg';
        errorBox.className = 'error-msg';
        document.querySelector('.formulario-wrapper').appendChild(errorBox);
    }

    errorBox.innerText = mensaje;
    errorBox.classList.add('visible');

    setTimeout(() => {
        errorBox.classList.remove('visible');
    }, 3000);
}

function registrarNombre() {
    const nombre = document.querySelector('[name="nombre"]').value.trim();
    const username = document.querySelector('[name="username"]').value.trim();

    const usuario = { nombre, username};

    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al registrar");
        return response.text();
    })
    .then(data => {
        alert("✔ " + data); // o mostrar pantalla de éxito animada
    })
    .catch(error => {
        console.error("Error:", error);
        mostrarError("Hubo un problema al registrar.");
    });
}
