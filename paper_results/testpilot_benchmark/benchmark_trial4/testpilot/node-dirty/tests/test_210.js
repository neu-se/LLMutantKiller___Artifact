let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function() {
        let db = dirty();
        let callCount1 = 0;
        let callCount2 = 0;
        
        // Define listeners
        let listener1 = function() {
            callCount1++;
        };
        
        let listener2 = function() {
            callCount2++;
        };
        
        // Add listeners
        db.on('test-event', listener1);
        db.on('test-event', listener2);
        
        // Emit event
        db.em    })
})