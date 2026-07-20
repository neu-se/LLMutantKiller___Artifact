let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - insert before delete when last op is delete and previous is not object', function(done) {
        let delta = new quill_delta([{ delete: 5 }]);
        delta.push({ insert: 'test' });
        assert.deepEqual(delta.ops, [{ insert: 'test' }, { delete: 5 }]);
        done();
    });

    })