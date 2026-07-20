let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        assert.equal(callCount, 1, 'Listener should be called once');
        
        // Remove listener
        db.removeListener('test-event', testListener);
        
        // Emit event again to verify listener is removed
        db.em})