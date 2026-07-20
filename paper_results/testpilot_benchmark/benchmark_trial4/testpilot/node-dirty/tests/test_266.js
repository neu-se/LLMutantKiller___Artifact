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

    it('multi-arg-event', function(done) {
        let receivedArgs = [];
        
        // Set up event listener to capture arguments
        db.on('test-event', function() {
            receivedArgs = Array.prototype.slice.call(arguments);
        });
        
        // Emit the event with multiple arguments
        db.em    })
})