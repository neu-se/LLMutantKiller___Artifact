let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
        
        // Verify order and that once listeners only fired once
        assert.strictEqual(results[0], 'prepended-once2', 'last prepended listener should be first');
        assert.strictEqual(results[1], 'prepended-once1', 'first prepended listener should be second');
        assert.strictEqual(results[2], 'listener1', 'first regular listener should be third');
        assert.strictEqual(results[3], 'listener2', 'second regular listener should be fourth');
        
        // Second emission should only have regular listeners
        assert.strictEqual(results[4], 'listener1', 'only regular listeners on second emit');
        assert.strictEqual(results[5], 'listener2', 'only regular listeners on second emit');
        assert.strictEqual(results.length, 6, 'should have exactly 6 events total');
        
        done();
    });