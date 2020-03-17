const express = require('express');
const router = express.Router();
// const waypointModel = require('../models/waypoint');
var multer = require('multer');
var upload = multer({dest:'test'});
var ba64 = require("ba64")
const mountainModel = require('../models/mountains');



router.get('/:id', async function(req, res, next) {
  const {
    id, 
} = req.params;
const mountainData = await mountainModel.getMountainById(id);

  res.render('template', { 
    locals: {
      title: `  | Create a Route`,
      mountainData: mountainData,
      is_logged_in: req.session.is_logged_in,
      climber_id: req.session.climber_id,
      id: id
    },
    partials: {
      partial: 'partial-create-route'
    }
  });
});

    


  router.post('/upload', async function(req, res, next){
    

    try {
    const {mountain_id} = req.body;
    const { climber_id } = req.body;
    const { myinput } = req.body;
    console.log("climber id",climber_id);
    console.log("mountain id", mountain_id);

    const {name} = req.body;
    
    const data_url = myinput
    await ba64.writeImageSync(`public/images/${name}`, data_url);
    await res.redirect('/mountains/');
    }

    catch {

    res.status(404)
    }

  })


// router.post('/', async function (req, res) {
//   console.log(req.body);
//   const {
//       review_title,
//       review_text,
//       reviewer_name,
//       mountain_id,
//       climber_id
//   } = req.body

//   const postData = await mountainModel.addReviews(review_title,
//       review_text,
//       reviewer_name,
//       mountain_id,
//       climber_id
//       );
//   console.log(postData);

//   res.status(200).redirect('/');
// });


module.exports = router;