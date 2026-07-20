let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with data payload', function(done) {
        let db = dirty();
        let receivedData = null;
        
        db.on('load', function() {
            db.on('drain', function() {
                // Test that we can retrieve the data we set
                let retrievedData = db.get('testKey');
                assert.deepEqual(retrievedData, testData);
                done();
            });
            
            let testData = { key: 'value', number: 42 };
            db.set('testKey', testData);
        });
    });
});