let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test');
        
        // The once listener should only be called once and should be first
        assert.strictEqual(callCount, 1, 'prependOnceListener should only be called once');
        assert.deepStrictEqual(eventOrder, ['once', 'regular', 'regular'], 'prependOnceListener should be called first');
        
        done();
    });