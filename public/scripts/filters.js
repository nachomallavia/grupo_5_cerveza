window.addEventListener('load', (event) => {

    let productos = JSON.parse(document.getElementById('arrayproductos').getAttribute('data'));
    
    let resultados = [];
    let exclusiones =[];
    let filterForm = document.getElementById('filters');
    let sortselect = document.getElementById('ordenar');

    let inputMinPrice = document.getElementById('min-price');
    let minPriceHolder = inputMinPrice.value;
    let inputMaxPrice = document.getElementById('max-price');
    let maxPriceHolder = inputMaxPrice.value;
    let btnPrice = document.getElementById('btn-price-check');
    
    let inputAbv = document.getElementById('input-alcohol');
    let displayAbv =document.getElementById('abv-display');
    let abvHolder = displayAbv.innerText;

    let inputIbu = document.getElementById('input-ibu');
    let displayIbu =document.getElementById('ibu-display');
    let ibuHolder = displayIbu.innerText;

    inputAbv.addEventListener('change', (event)=>{
        
        let resultadosAbv = [];
        let exclusionesAbv = [];
        if (resultados.length>0){
            resultados.forEach( (product) =>{
                if (product.abv>=inputAbv.value){
                    resultadosAbv.push(product);
                } else{
                        exclusionesAbv.push(product);
                    }
            })
            if(exclusiones.length>0){
                exclusiones.forEach((product)=>{
                    if (product.abv>=inputAbv.value){
                        resultadosAbv.push(product);
                    }
                })
            }
         
        }
         else { 
            productos.forEach( (product)=>{
                if (product.abv>=inputAbv.value){
                    resultadosAbv.push(product);
                } else{
                        exclusionesAbv.push(product);
                    }

            })
        }
        
        

        // if (inputAbv.value < abvHolder) {
        //     resultadosAbv = productos.filter((product)=>{
        //     return product.abv>=inputAbv.value;})
        // } else if (resultados.length>0) {
        //     resultadosAbv = resultados.filter((product)=>{
        //         return product.abv >= inputAbv.value;});
        
        // } else{
        //     resultadosAbv = productos.filter((product)=>{
        //         return product.abv>=inputAbv.value;
        //     });            
        // }
        resultados = resultadosAbv;
        exclusiones = exclusionesAbv;     
        abvHolder = inputAbv.value;
        displayAbv.innerText = inputAbv.value;
        

        update(resultados, exclusiones);
    })

    inputIbu.addEventListener('change', (event)=>{
        
        let resultadosIbu = [];

        if (inputIbu.value < ibuHolder) {
            resultadosIbu = productos.filter((product)=>{
            return product.ibu>=inputIbu.value;})

        } else if (resultados.length>0) {
            resultadosIbu = resultados.filter((product)=>{
                return product.abv >= inputAbv.value;});
        
        } else{
            resultadosIbu = productos.filter((product)=>{
                return product.ibu>=inputIbu.value;
            });            
        }
        resultados = resultadosIbu;
        ibuHolder = inputIbu.value;
        displayIbu.innerText = inputIbu.value;

        update(resultados, exclusiones);
    })



    btnPrice.addEventListener('click', (event)=>{
        event.preventDefault();
        filterPrice(inputMinPrice.value,inputMaxPrice.value)})

    function filterPrice(min,max) {
         let resultadosPrice=[];

            if(resultados.length <= 0) {

                if (min < minPriceHolder || max > maxPriceHolder){
                    resultadosPrice = productos.filter(product=>{
                        return product.price>min && product.price<max;
                    })
                }

                if(min == "" && max > min){
                    resultadosPrice = productos.filter(product=>{
                        return product.price<max;
                    })

                } else if (min < max){  
                    resultadosPrice = productos.filter(product=>{
                        return product.price>min && product.price<max;
                    })
                } else if( min>0 && max == "" ){
                    resultadosPrice = productos.filter((product)=>{
                        return product.price>min 
                    })
                }
                
            } else {
                    if (min < minPriceHolder || max > maxPriceHolder){
                        resultadosPrice = productos.filter(product=>{
                            return product.price>min && product.price<max;
                        })
                    }
                    if(min == "" && max > min){
                        resultadosPrice = resultados.filter(product=>{
                            return product.price<max;
                        })

                    } else if(min < max){  
                        resultadosPrice = resultados.filter(product=>{
                            return product.price>min && product.price<max;
                        })
                    } else if(min>0 && max == "" ){
                        resultadosPrice = resultados.filter((product)=>{
                            return product.price>min 
                        })
                    }
                    
                }
        resultados = resultadosPrice;
        minPriceHolder = min;
        maxPriceHolder = max;
                     
        update(resultados, exclusiones);
    }
    
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
        update(resultados, exclusiones);
    }

    // pasar los resultados al DOM si existen
    function update(resultados, exclusiones) {
        if(resultados.length>0){
            let list = document.getElementById('list-container');
            list.innerHTML="";
            // console.clear();
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
                
                // console.log(exclusiones);                
                list.appendChild(card); 
            });
            
        } 
    }
})
