let db = require('../database/models');
const testController = {
    productTest: async function(req,res){
        console.log("---------------------- esperando promesas -----------------------")
        const products = await db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const makers = await db.Makers.findAll();
        const srmIndex = await db.Srm.findAll();
        const categories = await db.Categories.findAll();
        const formats = await db.Formats.findAll();
        console.log("---------------------- promesas listas -----------------------")

        res.render('products/productList',{'categorias': categories,'fabricantes': makers,'productos': products,'coloresSrm':srmIndex, 'formatos': formats})
    }             
            
        
}

module.exports = testController;