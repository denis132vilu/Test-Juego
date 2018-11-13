var btnSesion = document.getElementById('btnSesion');
var btnLogout = document.getElementById('btnLogout');
var txtDisplayName = document.getElementById('txtDisplayName');
var txtEmail = document.getElementById('txtEmail');
var btnSave = document.getElementById('btnSave');
var refDB = firebase.database().ref('usuario');
var refImg = firebase.storage().ref;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        abrirSesion();
        mostrarInformacionPerfil(user.uid);
    } else {
        cerrarSesion();
    }
});

function mostrarInformacionPerfil(uid) {
    refDB.child(uid).once('value', function(data) { 
        txtDisplayName.value = data.val().displayName;
        txtEmail.value = data.val().email;
    });
}

btnSesion.addEventListener('click', function() {
    abrirSesion();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then(function(datos) {
        var usuario = {
            displayName: datos.user.displayName,
            email: datos.user.email,
            uid: datos.user.uid
        };
        refDB.child(usuario.uid).set(usuario);
        txtDisplayName.value = usuario.displayName;
        txtEmail.value = usuario.email;
    });
});

btnLogout.addEventListener('click', function() {
    cerrarSesion();
    firebase.auth().signOut().then(function () {
        alert('Cerraste sesión');
    });
});

btnSave.addEventListener('click', function(event) {
    event.preventDefault();
    var usuario = {
        displayName: txtDisplayName.value,
        email: txtEmail.value,
    };
    refDB.child(firebase.auth().currentUser.uid).update(usuario);

    refDB.child(usuario).then(function() {
        alert('Registro almacenado');
    }).catch(function(error) {
        alert('Error: ' + error);
    });
})

function abrirSesion() {
    btnSesion.style.display = 'none';
    btnLogout.style.display = 'block';
}

function cerrarSesion() {
    btnSesion.style.display = 'block';
    btnLogout.style.display = 'none';
    txtDisplayName.value=null;
    txtEmail.value=null;    
}