let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should merge consecutive insert operations with same attributes', function(done) {
        const delta = new quill_delta();
        delta.insert('hello');
        delta.insert(' world');
        assert.deepEqual(delta.ops, [{ insert: 'hello world' }]);
        done();
    });

    })