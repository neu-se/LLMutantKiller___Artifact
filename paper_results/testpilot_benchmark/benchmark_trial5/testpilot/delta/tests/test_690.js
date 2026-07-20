let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with attributes', function(done) {
        // Test transforming operations with attributes
        let delta1 = new quill_delta([{retain: 5, attributes: {bold: true}}]);
        let delta2 = new quill_delta([{retain: 5, attributes: {italic: true}}]);
        
        let result = delta1.transform(delta2, false);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        assert(Array.isArray(result.ops), 'Should have ops array');
        done();
    });
});