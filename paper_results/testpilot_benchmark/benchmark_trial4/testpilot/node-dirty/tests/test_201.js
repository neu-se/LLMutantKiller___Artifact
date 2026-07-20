let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        assert.equal(callCount1, 1, 'First listener should be called');
        assert.equal(callCount2, 1, 'Second listener should be called');
        
        // Remove only first listener
        db.removeListener('test-event', listener1);
        
        // Emit event again
        db.em})