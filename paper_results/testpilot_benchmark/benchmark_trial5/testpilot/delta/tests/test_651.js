let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with retain and format', function(done) {
        let base = new quill_delta([{insert: 'Hello', attributes: {bold: true}}]);
        let delta = new quill_delta([{retain: 5, attributes: {bold: null, italic: true}}]);
        let inverted = delta.invert(base);
        
        // Inverting attribute changes should restore original attributes
        assert.deepEqual(inverted.ops, [{retain: 5, attributes: {bold: true, italic: null}}]);
        done();
    });

    })