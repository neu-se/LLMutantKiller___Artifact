let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount1 = 0;
        let callCount2 = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Define event listeners
        let listener1 = function() {
            callCount1++;
        };
        
        let listener2 = function() {
            callCount2++;
        };
        
        // Add listeners
        db.on('load', listener1);
        db.on('load', listener2);
        
        // Trigger the event once
        db.em    })
})