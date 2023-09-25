const getAllProducts = async(req, res) => {
    try {
        res.send('ok')
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al obtener los productos', error})
    }
}
const getOneProducts = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al obtener el producto', error})

    }
}
const createProduct = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al crear el producto', error})

    }
}
const editProduct = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al editar el producto', error})

    }
}
const deleteProduct = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al eliminar el producto', error})

    }
}
module.exports = {
    getAllProducts,
    getOneProducts,
    createProduct,
    editProduct,
    deleteProduct
}