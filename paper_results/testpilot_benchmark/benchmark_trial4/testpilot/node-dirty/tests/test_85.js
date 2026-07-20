let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - removeListener', function(done) {
        let db = dirty();
        let callCount = 0;

        function testListener() {
            callCount++;
        }

        db.on('remove-test', testListener);
        
        // Emit the event to test the listener
        db.em    })
})