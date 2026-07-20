let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('remove-test', function(done) {
        let callCount = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up a listener that increments callCount
        db.on('load', function() {
            callCount++;
        });
        
        // Trigger the event once
        db.em    })
})