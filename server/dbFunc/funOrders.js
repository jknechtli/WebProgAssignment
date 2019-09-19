const docArray = [
  { name: 'A', id: 0, description: 'stuff', price: 17.76, units: 2 },
  { name: 'B', id: 1, description: 'stuff', price: 50.26, units: 10 },
  { name: 'C', id: 2, description: 'stuff', price: 9.11, units: 3 },
]
const queryJSONf = '';
const queryJSONup = { name: "A" };
const updateJSON = { id: 5 };
const queryJSONdel = { id: 2 };
const operations = require('./functions');

module.exports = (client, col) =>
  operations.insertDocuments(col, docArray,
    () => operations.updateDocument(col, queryJSONup, updateJSON,
      () => operations.removeDocument(col, queryJSONdel,
        () => operations.findDocuments(col, queryJSONf,
          () => client.close()
        )
      )
    )
  );
