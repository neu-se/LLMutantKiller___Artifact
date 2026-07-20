let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with delete operation', function(done) {
        let base = new quill_delta([{insert: 'Hello World'}]);
        let change = new quill_delta([{retain: 5}, {delete: 6}]);
        let inverted = change.invert(base);
        
        // The inverted delta should re-insert the deleted text
        assert.deepEqual(inverted.ops, [{retain: 5}, {insert: ' World'}]);
        done();
    });

    })