let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'test-data');
        
        // Verify the listener was only called once
        setTimeout(() => {
            assert.strictEqual(callCount, 1);
            done();
        }, 10);
    });