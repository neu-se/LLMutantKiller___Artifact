let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        // Create a new in-memory dirty database for each test
        db = dirty();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('data-event', function(done) {
        const testData = { key: 'testKey', val: 'testValue' };
        let receivedData = null;
        
        // Listen for the 'data' event
        db.on('data', function(data) {
            receivedData = data;
        });
        
        // Set some data to trigger the event
        db.set(testData.key, testData.val);
        
        setTimeout(() => {
            assert.deepStrictEqual(receivedData, testData, 'Event data should match');
            done();
        }, 10);
    });
});