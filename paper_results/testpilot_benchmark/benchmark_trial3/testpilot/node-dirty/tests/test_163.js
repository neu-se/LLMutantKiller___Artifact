let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        
        // Verify the prependOnceListener was called only once and executed first
        assert.strictEqual(callCount, 1, 'prependOnceListener should be called only once');
        assert.strictEqual(eventOrder[0], 'prepended-once', 'prependOnceListener should execute first');
        assert.strictEqual(eventOrder[1], 'regular', 'regular listener should execute after prepended listener');
        assert.strictEqual(eventOrder.length, 4, 'should have 4 total events: 1 prepended + 3 regular');
        
        done();
    });