var refImg = firebase.storage().ref();
var imagenA = document.getElementById('Alan');
var imagenB = document.getElementById('Bryan');
var imagenD = document.getElementById('Denis');

function mostrarImagen(){
    refImg.child('alan.jpg').getDownloadURL().then(function(url){
        imagenA.src = url;
    });
    refImg.child('bryan.jpg').getDownloadURL().then(function(url){
        imagenB.src = url;
    });
    refImg.child('denis.png').getDownloadURL().then(function(url){
        imagenD.src = url;
    });
    

}

