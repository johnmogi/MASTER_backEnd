const Item = require('../models/item');
const Category = require('../models/Category');

function getAllItems() {
    return Item.find({}).populate("categories").exec();
}
function getOneItem(_id) {
    return Item.find({_id}).populate("categories").exec();
}

// function getOneCat(_id) {
//     return Category.findOne({ categoryId : _id });
// }

function addItem(item){
    return item.save();
}


function updateItem(item, _id) {

    return new Promise((resolve, reject) => {
        Item.updateOne({ _id: _id }, item, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? item : null);
        });
    });
}


module.exports = {
    getAllItems,
    getOneItem,
    // getOneCat,
    addItem,
    updateItem

}