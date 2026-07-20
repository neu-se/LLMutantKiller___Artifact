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

    it('should emit events with multiple arguments', function(done) {
        let receivedArgs = [];
        
        db.on('multi-arg-event', function(...args) {
            receivedArgs = args;
        });
        
        db.em    })
})