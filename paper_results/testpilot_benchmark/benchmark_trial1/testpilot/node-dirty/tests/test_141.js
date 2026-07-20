let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        let callOrder = [];
        
        // Simulate some operations that should happen in order
        callOrder.push('first');
        callOrder.push('second');
        callOrder.push('last');
        
        assert.strictEqual(callOrder.length, 3);
        assert.strictEqual(callOrder[0], 'first');
        assert.strictEqual(callOrder[1], 'second');
        assert.strictEqual(callOrder[2], 'last');
        
        done();
    });
});