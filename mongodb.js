const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'pruebas';

MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log(`Unable to connect to database: ${databaseName}`);
    }

    const db = client.db(databaseName);

   // NOTE: insertOne (option 1)
    db.collection('users').insertOne(
        {name: 'Juliet', age: 37}
    ).then((result) => {
        console.log(`Document inserted: ${result.acknowledged}`);
    }).catch((error) => {
        console.log('Could not insert the document', error);
    });

    // NOTE: insertOne (option 2)
    const claire = {name: 'Claire', age: 45};

    db.collection('users').insertOne(claire)
    .then((result) => {
        console.log(`Document inserted: ${result.acknowledged}`);
    }).catch((error) => {
        console.log('Could not insert the document', error);
    });
    //============================================================================


    // NOTE: insertMany (option 1)
    db.collection('users').insertMany([
        {name: 'Rick', age: 29},
        {name: 'Chloe', age: 17},
        {name: 'Andrea', age: 29},
    ]).then((result) => {
        console.log(`Documents inserted: ${result.acknowledged}`);
        console.log(`Number of documents inserted: ${result.insertedCount}`);
    }).catch((error) => {
        console.log('Could not insert the documents', error);
    });

    // NOTE: insertMany (option 2)
    const usersArray = [
        {name: 'Alice', age: 32},
        {name: 'John', age: 14},
        {name: 'Wendy', age: 58},
    ];

    db.collection('users').insertMany(usersArray).then((result) => {
        console.log(`Documents inserted: ${result.acknowledged}`);
        console.log(`Number of documents inserted: ${result.insertedCount}`);
    }).catch((error) => {
        console.log('Could not insert the documents', error);
    });
    //============================================================================


    // NOTE: findOne (returns the first occurrence in the selection)
    db.collection('users').findOne(
        {_id: ObjectId('62b0a02e89dcaeb54696ade9')}
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to find the document', error);
    });

    db.collection('users').findOne(
        {name: 'Juliet'}
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to find the document', error);
    });
    //============================================================================


    // NOTE: find (returns all occurrences in the selection)
    // find all documents in the 'users' collection
    // find returns a cursor => we need to use the toArray() method
     db.collection('users').find({}).toArray()
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to find any match', error);
    });

    // find all documents in the 'users' collection with an age of 29
    // find returns a cursor => we need to use the toArray() method
    db.collection('users').find({age: 29}).toArray()
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to find any match', error);
    });
    //============================================================================


    // NOTE: updateOne
    db.collection('users').updateOne(
        {name: 'John'},
        {$set: {age: 17}}
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    //============================================================================
    
    
    //NOTE: updateMany
    db.collection('users').updateMany(
        {age: 17},
        {$set: {age: 19}}
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    //============================================================================


    //NOTE: deleteOne
    db.collection('users').deleteOne(
        {_id: ObjectId('62b0a02e89dcaeb54696adec')}
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Could not delete the document', error);
    });
    //============================================================================


    //NOTE: deleteMany
    db.collection('users').deleteMany(
        {age: 19}
    ).then((result) => {
        console.log(`Number of documents deleted: ${result.deletedCount}`);
    }).catch((error) => {
        console.log('Could not delete the documents', error);
    });
    //============================================================================


    // NOTE: countDocuments
    // count all documents in the 'users' collection
    db.collection('users').countDocuments({})
    .then((result) => {
        console.log(`Number of documents: ${result}`);
    }).catch((error) => {
        console.log(error);
    });

    // count all documents in the 'users' collection with an age of 29
    db.collection('users').countDocuments({age: 29})
    .then((result) => {
        console.log(`Number of documents: ${result}`);
    }).catch((error) => {
        console.log(error);
    });

    // count all documents in the 'users' collection with an age > 29
    db.collection('users').countDocuments({age: {$gt: 29}})
    .then((result) => {
        console.log(`Number of documents: ${result}`);
    }).catch((error) => {
        console.log(error);
    });  
    //============================================================================

});