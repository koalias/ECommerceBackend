const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const response = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        },
      ],
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const response = await Tag.findOne({
      // be sure to include its associated Products
      where: {
        id:req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        }
      ],
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const response = await Tag.create({
      tag_name : req.body.tag_name
   });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const response = await Tag.update(req.body, {
      where: {
      id:req.params.id
      }
    })
    res.json(response)
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    const response = await Tag.destroy({
      where: {
      id:req.params.id
      }
    })
    res.json(response)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
