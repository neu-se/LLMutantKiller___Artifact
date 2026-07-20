let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - merge consecutive delete operations', function(done) {
        let delta = new quill_delta([{ delete: 5 }]);
        delta.push({ delete: 3 });
        assert.deepEqual(delta.ops, [{ delete: 8 }]);
        done();
    });

    })