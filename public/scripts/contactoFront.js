let qs = function(element){
    return document.querySelector(element)
}


window.addEventListener('load', function(){

    let form = qs('#contactoForm')
    form.addEventListener('submit', function(evento){
        evento.preventDefault();
        console.log('hola');

        let errorEmail = qs('#errorEmail');
        let errorTexto = qs('#errorTexto');
        let errorTelefono = qs('#errorTelefono');
        let errorNombre = qs('#errorNombre');

        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errores = {};

        if(!regexEmail.test(form.email.value)){
            errores.email = 'Debe ingresar un email válido';
            errorEmail.innerText = errores.email;
        } else {
            errorEmail.innerText = ''
        };
        if(form.txtMsg.value.length <1){
            errores.texto = 'Debe ingresar algún texto';
            errorTexto.innerText = errores.texto;
        } else {
            errorTexto.innerText = ''
        };
        if(form.txtPhone.value.length <1){
            errores.telefono = 'Debe ingresar un teléfono';
            errorTelefono.innerText = errores.telefono;
        } else {
            errorTelefono.innerText = ''
        };
        if(form.txtName.value.length <1){
            errores.nombre = 'Debe ingresar su nombre';
            errorNombre.innerText = errores.nombre;
        } else {
            errorNombre.innerText = ''
        };
        if(Object.keys(errores).length>0){
            console.log(errores); 
        } else {
            form.submit()
        };
    })
    })