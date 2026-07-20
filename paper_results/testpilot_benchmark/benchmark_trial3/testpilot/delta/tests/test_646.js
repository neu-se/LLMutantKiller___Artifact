let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with retain and format', function(done) {
        let base = new quill_delta([{insert: 'Hello', attributes: {bold: true}}]);
        let change = new quill_delta([{retain: 5, attributes: {bold: null, italic: true}}]);
        let inverted = change.invert(base);
        
        // The inverted delta should restore original formatting
        assert.deepEqual(inverted.ops, [{retain: 5, attributes: {bold: true, italic: null}}]);
        done();
    });

    })