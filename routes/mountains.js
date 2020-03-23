const express = require('express');
const router = express.Router();
const mountainModel = require('../models/mountains');


router.get('/', async (req, res, next) => {
  const data = await mountainModel.getAllMountains();

//   res.render('template', {
//     locals: {
//       title: 'Mountain Archive',
//       data: data,
//       is_logged_in: req.session.is_logged_in,
//       first_name: req.session.first_name
//     },
//     partials: {
//       partial: 'partial-mtn-list'
//     }
//   });
// });

res.json(data);

});

router.get('/:id?', async (req, res) => {

  const {
    id
  } = req.params;

  const mountainData = await mountainModel.getMountainById(id);
  const getReviewDetails = await mountainModel.getReviewDetails(id);


  const { name } = mountainModel;


  res.render('template', {
    locals: {
      title: name,
      mountainData: mountainData,
      getReviewDetails: getReviewDetails,
      is_logged_in: req.session.is_logged_in,

      climber_id: req.session.climber_id,
      first_name: req.session.first_name
    },
    partials: {
      partial: 'partial-single'
    }
  })
});



router.post('/', async function (req, res) {
  console.log(req.body);
  const {
    review_title,
    review_text,
    reviewer_name,
    mountain_id,
    climber_id
  } = req.body

  const postData = await mountainModel.addReviews(review_title,
    review_text,
    reviewer_name,
    mountain_id,
    climber_id
  );
  console.log(postData);

  res.status(200).redirect('/');
});


module.exports = router;
