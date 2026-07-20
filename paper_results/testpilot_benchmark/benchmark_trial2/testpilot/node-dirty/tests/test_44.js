let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let testData = { key: 'value', number: 42, array: [1, 2, 3] };
    
    function testDataFunction(done) {
        // Create a dirty database instance
        let db = dirty();
        
        // Set some test data
        db.set('testKey', testData);
        
        // Retrieve the data
        let receivedData = db.get('testKey');
        
        assert.deepEqual(receivedData, testData, 'should receive the correct data payload');
        
        done();
    }
    
    it('data', testDataFunction);
});