let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        assert.strictEqual(callCount, 1, 'Listener should be called once');
        
        // Remove the listener
        db.removeListener('test-event', testListener);
        
        // Verify listener is removed by emitting event again
        db.em})