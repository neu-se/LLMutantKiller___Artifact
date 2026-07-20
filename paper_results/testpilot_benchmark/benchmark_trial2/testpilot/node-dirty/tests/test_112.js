let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
        
        assert.strictEqual(callOrder.length, 3);
        assert.strictEqual(callOrder[0], 'first');
        assert.strictEqual(callOrder[1], 'second');
        assert.strictEqual(callOrder[2], 'last');
        
        done();
    });