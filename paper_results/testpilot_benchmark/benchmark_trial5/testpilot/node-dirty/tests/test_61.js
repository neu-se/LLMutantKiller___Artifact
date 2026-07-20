let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter removeListener', function(done) {
        let db = dirty();  // Create a dirty database instance
        let listenerCalled = false;
        
        function testListener() {
            listenerCalled = true;
        }
        
        // Add and then remove listener
        db.on('remove-test', testListener);
        db.removeListener('remove-test', testListener);
        
        // Emit event
        db.em    })
})