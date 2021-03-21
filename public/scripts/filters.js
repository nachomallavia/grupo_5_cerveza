window.addEventListener('load', (event) => {

    let productos = JSON.parse(document.getElementById('arrayproductos').getAttribute('data'));
    let resultados = [];
    let filterForm = document.getElementById('filters');
    let sortselect = document.getElementById('ordenar');
    
    sortselect.addEventListener('change', ()=>sortBy(sortselect.value))

    function sortBy (byproperty) { 
        let desc = sortselect.options[sortselect.selectedIndex].getAttribute('data-desc');
        console.log(desc);
        if (resultados.length>0){
            resultados.sort((a,b)=>a[byproperty]-b[byproperty]);
        } else{
            productos.sort((a,b)=>a[byproperty]-b[byproperty]);
            resultados = productos;
        }        
        if (desc === 'false'){
         resultados.reverse();
         console.log('desc falso');
        }        
        console.log('---------resultados-------');
        console.log(resultados);
        update();
    }

    // pasar los resultados al DOM si existen
    function update(){
        if(resultados.length>0){
            let list = document.getElementById('list-container');
            list.innerHTML="";
            
            resultados.forEach(product => {
                console.log(product);
                let card = document.createElement('div');
                card.classList.add('list','card');
                card.innerHTML = 
                `<div class="card title">
                    <a href="/products/${product.id}" class="prodTitle">
                        <h3 id="prod-title">${product.name}</h3>
                    </a>
                    <h5> por ${product.maker.name}</h5>                
                </div>
                <div class= "card prod-img">
                    <a href= "/products/${product.id}" class="prodTitle">
                        <img id="prod-img" class="prod-img" src="/uploads/${product.image}" alt="${product.name}">
                    </a>
                </div>
                
                <div class="card rating">
                ` // cierra el inner HTML de la card
                
                                
                list.appendChild(card); 
            });
            console.dir(list);
        }
    }
})
