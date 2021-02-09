window.addEventListener('load', function(){
    var form = document.querySelector('#createForm')
    form.addEventListener('submit', function(event){
        event.preventDefault();
        console.log("Acá");
        let errorName = document.querySelector('#errorName');
        let errorDesc= document.querySelector('#errorDesc');
        let errorPrice = document.querySelector('#errorPrice');
        let errorIbu = document.querySelector('#errorIbu');
        let errorAbv = document.querySelector('#errorAbv');
        
        let regex = /^[\.a-zA-Z0-9,!? ]*$/;
        let errores = {};

        if(!regex.test(form.pname.value) || form.pname.value == ''){
            errores.name = 'Debe ingresar un nombre válido (Solo letras).';
            errorName.innerText = errores.name;
        } else {
            errorName.innerText = '';
        }
        if(form.pdesc.value == ''){
            errores.desc = 'Debe ingresar una descripción';
            errorDesc.innerText = errores.desc;
        } else {
            errorDesc.innerText = '';
        }
        if(form.pprice.value == 0){
            errores.price = 'Debe ingresar un precio válido';
            errorPrice.innerText = errores.price;
        } else {
            errorPrice.innerText = '';
        }
        if(form.pabv.value == 0){
            errores.abv = 'Debe ingresar un ABV válido';
            errorAbv.innerText = errores.abv;
        } else {
            errorAbv.innerText = '';
        }
        if(form.pibu.value == 0){
            errores.ibu = 'Debe ingresar un IBU válido';
            errorIbu.innerText = errores.ibu;
        } else {
            errorIbu.innerText = '';
        }
        if(Object.keys(errores).length>0){
            console.log(errores); 
        } else {
            form.submit()
        }
    })
})