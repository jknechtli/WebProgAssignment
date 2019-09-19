exports.insertDocuments = (collection, docArray, callback) => {
  collection.insertMany(docArray, (err, result) => {
    console.log("inserted the following documents into the collection:");
    console.log(docArray);
    callback(result);
  });
};

exports.findDocuments = (collection, queryJSON, callback) => {
  collection.find(queryJSON).toArray((err, docs) => {
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

exports.updateDocument = (collection, queryJSON, updateJSON, callback) => {
  collection.updateOne(queryJSON, { $set: updateJSON }, (err, result) => {
    console.log("For the documents with");
    console.log(queryJSON);
    console.log("SET: ");
    console.log(updateJSON);
    callback(result);
  });
};

exports.removeDocument = (collection, queryJSON, callback) => {
  collection.deleteOne(queryJSON, (err, result) => {
    console.log("Removed the document with");
    console.log(queryJSON);
    callback(result);
  });
};
