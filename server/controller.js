module.exports = {
    read: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_inventory()
        .then( products => {
            res.status(200).send(products)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('Sorry! It looks like something went wrong.')
        })
    },
    create: (req, res, next) => {
        
        const dbInstance = req.app.get('db');
        const { name, price, image_url } = req.body

        let URL = image_url ? image_url : 'https://www.lauriloewenberg.com/wp-content/uploads/2019/04/No_Image_Available.jpg'

        dbInstance.add_new_product([name, price, URL])
        .then( () => {
            dbInstance.get_inventory()
            .then( products => {
                
                res.status(200).send(products)
            })
            .catch( err => {
                console.log(err);
                res.status(500).send('Sorry! It looks like something went wrong.')
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Sorry! It looks like something went wrong.')
        })
    },

    delete: (req, res, next) => {

        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.delete_product([id])
        .then( () => {
            dbInstance.get_inventory()
            .then( products => {
                res.status(200).send(products)
            })
            .catch( err => {
                console.log(err);
                res.status(500).send('Sorry! It looks like something went wrong.')
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Sorry! It looks like something went wrong.')
        })

    },
    edit: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        const { name, price, image_url } = req.body;

        dbInstance.edit_product([name, price, image_url, id])
        .then( () => {
            dbInstance.get_inventory()
            .then( products => {
                res.status(200).send(products)
            })
            .catch( err => {
                console.log(err);
                res.status(500).send('Sorry! It looks like something went wrong.')
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Sorry! It looks like something went wrong.')
        })

    },
    getOne: (req, res, next) => {
        
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.get_one_product([id])
        .then( product => {
            res.status(200).send(product)
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Sorry! It looks like something went wrong.')
        })
    }
}