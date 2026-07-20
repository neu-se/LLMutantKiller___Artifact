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

    it('should emit events with single argument', function(done) {
        let receivedData = null;
        
        db.on('data-event', function(data) {
            receivedData = data;
        });
        
        const testData = { key: 'value', number: 42 };
        db.em    })
})