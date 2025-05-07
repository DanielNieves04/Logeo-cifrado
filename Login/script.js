let usuarioId = null;

function mostrarFormulario2() {
    const nombre = document.querySelector('[name="nombre"]');
    const username = document.querySelector('[name="nickName"]');

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
    const nickName = document.querySelector('[name="nickName"]').value.trim();
    const fecha = Date.now();

    const usuario = { nombre, fecha, nickName };

    fetch("https://205l8qf8-8081.use2.devtunnels.ms/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.text(); // Obtiene el texto de la respuesta (el número entero)
    })
    .then(idTexto => {
        usuarioId = parseInt(idTexto, 10);
        
        if (isNaN(usuarioId)) {
            throw new Error("El ID recibido no es un número válido");
        }
        
        console.log("ID registrado:", usuarioId);
        
        // Aquí puedes usar el ID (ej: mostrarlo al usuario)
        alert(`Registro exitoso! Tu ID es: ${usuarioId}`);
        mostrarFormulario2();
    })
    .catch(error => {
        console.error("Error en el registro:", error);
        alert("Error al registrar: " + error.message);
    });
}

function registrarUsuario() {
    console.log('Función ejecutándose');
    
    // Validación mejorada
    if (!usuarioId || isNaN(usuarioId)) {
        mostrarError("ID de usuario inválido. Complete el primer formulario.");
        return;
    }

    const email = document.querySelector('[name="email"]').value.trim();
    const contrasena = document.querySelector('[name="contrasena"]').value.trim();

    // Validar campos vacíos
    if (!email || !contrasena) {
        mostrarError("Email y contraseña son obligatorios");
        return;
    }

    console.log("ID registrado:", usuarioId);
    const usuarioData = {
        contrasena,
        token: generarToken(),
        grupo: 3,
        email,
        estadoCuenta: true,
        usuarioId: Number(usuarioId) // Asegurar que es número
    };

    fetch(`https://205l8qf8-8081.use2.devtunnels.ms/detalles/setDetailsToUser/${usuarioId}`, {
        method: "POST", // Método correcto para actualizar
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
    })
    .then(data => {
        alert("Registro completo!");
        window.location.href = '/dashboard';
    })
    .catch(error => {
        mostrarError(error.message);
    });
}

// Función para generar token (ejemplo básico)
function generarToken() {
    return Math.random().toString(36).substring(2, 18);
}

// Modificar el evento submit del formulario 2