let qs = function(element){
    return document.querySelector(element)
}


window.addEventListener('load', function(){

    let form = qs('#registerForm')
    form.addEventListener('submit', function(evento){
        evento.preventDefault();
        
        let birthdate = new Date(form.fecha.value)
        let today = new Date()
        let diff = today.getTime() - birthdate.getTime()
        let age = Math.floor(diff / (1000*60*60*24*365.25));        


        let errorEmail = qs('#errorEmail');
        let errorDate = qs('#errorDate');
        let errorPassword = qs('#errorPassword');
        let errorTerms = qs('#errorTerms')

        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errores = {}

        if(!regexEmail.test(form.email.value)){
            errores.email = 'Debe ingresar un email válido';
            errorEmail.innerText = errores.email;
        } else {
            errorEmail.innerText = ''
        };
        if(form.fecha.value== ''){
            errores.date = 'Debe ingresar su fecha de nacimiento'
            errorDate.innerText = errores.date
        } else if(age<18){
            errores.date = 'Debe ser mayor de 18 años para poder registrarse'
            errorDate.innerText = errores.date
        } else{
            errorDate.innerText = ''
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
        if(!form.terminos.checked){
            errores.terms = 'Debe aceptar nuestros términos y condiciones';
            errorTerms.innerText = errores.terms;
        } else {
            errorTerms.innerText = ''
        };

        if(Object.keys(errores).length>0){
            console.log(errores); 
        } else {
            form.submit()
        };
    })
})