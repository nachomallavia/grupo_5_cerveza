let qs = function(element){
    return document.querySelector(element)
}


window.addEventListener('load', function(){

    let form = qs('#loginForm')
    form.addEventListener('submit', function(evento){
        evento.preventDefault();
        console.log('hola');

        let errorEmail = qs('#errorEmail');
        let errorPassword = qs('#errorPassword');

        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errores = {};

        if(!regexEmail.test(form.email.value)){
            errores.email = 'Debe ingresar un email válido';
            errorEmail.innerText = errores.email;
        } else {
            errorEmail.innerText = ''
        };
        if(form.password.value.length <1){
            errores.password = 'Debe ingresar una contraseña';
            errorPassword.innerText = errores.password;
        } 
        else if(form.password.value.length < 8){
            errores.password = 'Su contraseña debe tener al menos 8 caracteres';
            errorPassword.innerText = errores.password;
        }  else {
            errorPassword.innerText = ''
        };
        if(Object.keys(errores).length>0){
            console.log(errores); 
        } else {
            form.submit()
        };
    })
    })