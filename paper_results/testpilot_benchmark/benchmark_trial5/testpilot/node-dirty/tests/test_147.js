let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('event1');
        
        // Verify only the correct event was handled
        setTimeout(() => {
            assert.strictEqual(event1Fired, true, 'Event1 should have been fired');
            assert.strictEqual(event2Fired, false, 'Event2 should not have been fired');
            done();
        }, 10);
    });
});