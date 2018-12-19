import mongoose from 'mongoose';
import { Router } from 'express';
import Compare from '../models/compare';
import Review from '../models/review';
import bodyParser from 'body-parser';

//import { authenticate } from "../middleware/authMiddleware";

export default({ config, db }) => {
  let api = Router();

  
  api.get('/', (req, res) => {
    Compare.find({}, (err, compare) => {
      if (err) {
        res.send(err);
      }
      res.json(compare);
    });
  });

  
  api.get('/:id',  (req, res) => {
    Compare.findById(req.params.id, (err, compare) => {
      if (err) {
        res.send(err);
      }
      res.json(compare);
    });
  });

  api.post('/add',  (req, res) => {
    let newCompare = new Compare();
    newCompare.pharmacy_name = req.body.pharmacy_name;
    newCompare.brand = req.body.brand;
    newCompare.discount_price = req.body.discount_price;
    newCompare.generic = req.body.generic;
    newCompare.form = req.body.form;
    newCompare.dosage = req.body.dosage;
    newCompare.quantity = req.body.quantity;
    newCompare.manufacturer = req.body.manufacturer;
    newCompare.estimated_price = req.body.estimated_price;
    // newCompare.geometry.coordinates = req.body.geometry.coordinates;
    newCompare.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'pharmacy successfully saved' });
    });
  });

  api.delete('/:id', (req, res) => {
    Compare.remove({
      _id: req.params.id
    }, (err, compare) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        Compare: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "pharmacy and Reviews Successfully Removed"});
      });
    });
  });

  // '/v1/compare:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Compare.findById(req.params.id, (err, compare) => {
      if (err) {
        res.send(err);
      }
    compare.pharmacy_name = req.body.pharmacy_name
    compare.brand = req.body.brand;
    compare.discount_price = req.body.discount_price;
    compare.generic = req.body.generic;
    compare.form = req.body.form;
    compare.dosage = req.body.dosage;
    compare.quantity = req.body.quantity;
    compare.manufacturer = req.body.manufacturer;
    compare.estimated_price = req.body.estimated_price;
      compare.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Pharmacy info updated' });
      });
    });
  });
  // add a review by a specific pharmacy id
  // '/v1/pharmacy/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    compare.findById(req.params.id, (err, compare) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.compare = compare._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        compare.reviews.push(newReview);
        compare.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Pharmacy review saved' });
        });
      });
    });
  });

  // get reviews for a specific pharmacy id
  // '/v1/pharmacy/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({compare: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}