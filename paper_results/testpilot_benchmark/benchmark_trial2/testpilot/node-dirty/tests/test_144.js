let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test');
        
        // The once listener should only be called once and should be first
        assert.strictEqual(callCount, 1, 'prependOnceListener should only be called once');
        assert.strictEqual(eventOrder[0], 'once', 'prependOnceListener should be called first');
        assert.strictEqual(eventOrder[1], 'regular', 'regular listener should be called second');
        assert.strictEqual(eventOrder[2], 'regular', 'regular listener should be called again');
        
        done();
    });