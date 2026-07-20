let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with empty base', function(done) {
        let base = new quill_delta();
        let change = new quill_delta([{insert: 'Hello'}]);
        let inverted = change.invert(base);
        
        // The inverted delta should delete the inserted text
        assert.deepEqual(inverted.ops, [{delete: 5}]);
        done();
    });

    })