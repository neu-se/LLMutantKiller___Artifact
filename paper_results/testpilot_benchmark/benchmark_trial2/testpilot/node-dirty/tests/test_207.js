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
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('data-event', testData);
        
        setTimeout(() => {
            assert.deepStrictEqual(receivedData, testData, 'Event data should match');
            done();
        }, 10);
    });