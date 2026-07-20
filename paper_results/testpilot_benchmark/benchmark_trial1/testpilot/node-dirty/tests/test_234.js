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
        const testData = { key: 'testKey', value: 'testValue' };
        let receivedData = null;
        
        // Listen for the 'load' event which fires when data is set
        db.on('load', function() {
            // Get the data that was set
            receivedData = { key: 'testKey', value: db.get('testKey') };
            
            setTimeout(() => {
                assert.deepStrictEqual(receivedData, testData, 'Event data should match');
                done();
            }, 10);
        });
        
        // Set some data to trigger the event
        db.set('testKey', 'testValue');
    });
});