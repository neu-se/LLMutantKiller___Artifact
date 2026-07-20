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

    it('should handle multiple listeners for same event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        let callOrder = [];
        
        db.on('shared-event', function() {
            listener1Called = true;
            callOrder.push('listener1');
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callOrder.push('listener2');
        });
        
        db.em    })
})