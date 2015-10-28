# Magic Methods for Mongoose

Creates Find Methods for all paths in your schema.

If the path is unique, a document is returned. If the path is not defined as unique, an array of documents is returned.

````
var schema = new Schema({
    title: String,
    slug: {type: String, unique: true},
    created_at: {type: Date, default: new Date()}
});

schema.plugin(require('MagicMethods'));

Model = mongoose.model('Model', schema);


Model.findByTitle(title, function(err, docs){
    //docs will be array of documents
});
Model.findBySlug(slug, function(err, doc){
    //doc will be array
});
````
Returns a ```Query``` object when no callback provided, so you can use these as part of a query chain:

````
var query = Model.findBySlug(title);

query
  .sort({
    created_at: -1
  })
  .exec((err, venue) => {
    // execute query
  });
````