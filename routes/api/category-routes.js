const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const response = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        },
      ],
    });
    res.json(response)

  } catch (err) {
    res.send(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const response = await Category.findOne({
      where: {
        id: req.params.id,
      },

      includes: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        },
      ],
    });
    res.json(response);
  } catch (err) {
    res.send(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const response = await Category.create({
      category_name: req.body.category_name,
    })
    res.json(response)
  } catch (err) {
    res.send(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const response = await Category.update(req.body, {
      where: {
        id:req.params.id
      }
    })
    res.json(response)
  } catch(err) {
    res.send(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const response = await Category.destroy({
      where: {
      id:req.params.id
      }
    })
    res.json(response)
  }catch(err){
    res.send(err)
  }
});

module.exports = router;
