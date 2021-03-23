window.addEventListener('load', (event) => {
    
    const productos = JSON.parse(document.getElementById('arrayproductos').getAttribute('data'));
    
    const condiciones = {};

    


    let resultados = [];
    let exclusiones =[];
    let filterForm = document.getElementById('filters');
    let sortselect = document.getElementById('ordenar');

    let inputMinPrice = document.getElementById('min-price');
    
    let inputMaxPrice = document.getElementById('max-price');
    
    let btnPrice = document.getElementById('btn-price-check');
    
    let inputAbv = document.getElementById('input-alcohol');
    let displayAbv =document.getElementById('abv-display');
    

    let inputIbu = document.getElementById('input-ibu');
    let displayIbu =document.getElementById('ibu-display');

    let categories = document.getElementsByClassName('categories');
    let makers = document.getElementsByClassName('makers');

    // formar condiciones basicas
    condiciones.price = [-100,2000];
    condiciones.abv = inputAbv.value;
    condiciones.ibu = inputIbu.value;
    condiciones.categories =[];
    condiciones.makers = [];
    condiciones.rating = 0;


    inputAbv.addEventListener('change', (event)=>{
        condiciones.abv = inputAbv.value;
        displayAbv.innerText = inputAbv.value;
        update(productos, condiciones);
    })

    inputIbu.addEventListener('change', (event)=>{
        
        condiciones.ibu = inputIbu.value;
        displayIbu.innerText = inputIbu.value;
        update(productos, condiciones);
    })
    // loop para las categorias

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        category.addEventListener('click',(e)=>{

            if(category.id != "allCategories" ){
                if(category.checked == false){
                    let index = condiciones.categories.indexOf(category.value);
                    condiciones.categories.splice(index,1);
                    update(productos, condiciones);
                }
                else{
                condiciones.categories.push(category.value);

                let checkAll = document.getElementById("allCategories");
                checkAll.checked = false;

                update(productos, condiciones);}

            } else if(category.id == "allCategories"){

                    condiciones.categories = [];
                    for(let i = 0; i < categories.length; i++){
                        if(categories[i].id != "allCategories" ){
                            categories[i].checked = false;
                        }
                    }
                    update(productos, condiciones);
                }
        });
       
        
        
    } // cierra loop para las categorias

     
    //loop para los makers

    for (let i = 0; i < makers.length; i++) {
        let maker = makers[i];
        maker.addEventListener('click',(e)=>{

            if(maker.id != "allmakers" ){
                if(maker.checked == false){
                    let index = condiciones.makers.indexOf(maker.value);
                    condiciones.makers.splice(index,1);
                    update(productos, condiciones);
                }
                else{
                condiciones.makers.push(maker.value);

                let checkAll = document.getElementById("allmakers");
                checkAll.checked = false;

                update(productos, condiciones);}

            } else if(maker.id == "allmakers"){

                    condiciones.makers = [];
                    for(let i = 0; i < makers.length; i++){
                        if(makers[i].id != "allmakers" ){
                            makers[i].checked = false;
                        }
                    }
                    update(productos, condiciones);
                }
        });
       
        
        
    }


    



    btnPrice.addEventListener('click', (event)=>{
        event.preventDefault();
        
        let min = parseInt(inputMinPrice.value);
        let max = parseInt(inputMaxPrice.value);
        
        condiciones.price = [min,max];

        
        update(productos, condiciones);
    })
    
    sortselect.addEventListener('change', ()=>sortBy(sortselect.value))

    function sortBy (byproperty) { 
        let desc = sortselect.options[sortselect.selectedIndex].getAttribute('data-desc');
       
        if (resultados.length>0){
            resultados.sort((a,b)=>a[byproperty]-b[byproperty]);
        } else{
            productos.sort((a,b)=>a[byproperty]-b[byproperty]);
            resultados = productos;
        }        
        if (desc === 'false'){
         resultados.reverse();
         
        }        
        
        loadResults(resultados);
    }

    // pasar los resultados al DOM si existen
    function update (productos, condiciones) {
        resultados = [];
        exclusiones = [];
        productos.forEach((product)=>{
            if (product.price > condiciones.price[0] && product.price < condiciones.price[1]){
                resultados.push(product);
            } else if( product.price > condiciones.price[0] && !condiciones.price[1]){
                resultados.push(product);
            } else if (product.price < condiciones.price[1] && !condiciones.price[0]){
                resultados.push(product);
            } else if(!condiciones.price[0] && !condiciones.price[1]){resultados.push(product)}
        })
        resultados = resultados.filter((product)=>{
            return product.abv >= condiciones.abv;
        })
        resultados = resultados.filter((product)=>{
            return product.ibu >= condiciones.ibu;
        })
        if(condiciones.categories.length > 0){
            resultados = resultados.filter((product)=> {
                
                return condiciones.categories.indexOf(product.category.name) >-1 ;
            })
        }
        if(condiciones.makers.length > 0){
            resultados = resultados.filter((product)=> {
                
                return condiciones.makers.indexOf(product.maker.name) >-1 ;
            })
        }

        
            
            

        if(resultados.length>0){
            loadResults(resultados);
        } else{
            let list = document.getElementById('list-container');
            list.innerHTML=`<h2 style= "font-weight: 800" >
                             No se encontraron resultados con estos criterios
                             </h2><br>
                             <a href="/products"><button>Recargar</button></a>`;
            // list.setAttribute('style','flex-direction: column');
            list.style.flexDirection = "column";
            list.style.alignItems = "center";
            
        }
    }

    function loadResults(resultados){
        let list = document.getElementById('list-container');
        list.innerHTML="";
        
        resultados.forEach(product => {
            
            let card = document.createElement('div');
            let rating = document.createElement('div');
            rating.classList.add('card','rating');
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
            ` // cierra el inner HTML de la card
            for (let s = 1; s<=product.rating; s++){
                rating.innerHTML += `<div class="fullstar"><img src="/img/star_full.svg" alt=""></div>`
            }
            for (let r = 1; r<=(5-product.rating); r++){
                rating.innerHTML += `<div class="emptystar"><img src="/img/star_empty.svg" alt=""></div>`
            }
            card.appendChild(rating);

            card.innerHTML += `<div class="card price">$${product.price}</div>`

            let alcohol = ((product.abv/14)*100);
            let ibu = product.ibu;

            card.innerHTML += `<div class= "meter alcohol">
            <div class= "alcohol text">
                <h4>Alcohol</h4>
                <h4 id="percentage-alcohol">${product.abv}%</h4>
            </div>
                            
            <div class="bar alcohol"><div id="bar-level-alcohol" style= "width: ${alcohol}%"></div></div>
            </div>`
            
            card.innerHTML += `<div class= "meter bitternes">
            <div class="bitternes text">
                <h4>Amargor</h4>
                <h4 id="number-bitternes">${ibu}</h4>
            </div>
            <div class="bar bitternes"><div id="bar-level-bitternes" style= "width: ${ibu}%"></div></div>
            </div>
            <div class="meter srm">
            <h4>Tono</h4>
            <div class = "srm-circle" id = "color-srm" style = "background-color: ${product.srm_index.code} "></div>
            </div>`
            
                      
            list.appendChild(card); 
        });
        
    } 
})
