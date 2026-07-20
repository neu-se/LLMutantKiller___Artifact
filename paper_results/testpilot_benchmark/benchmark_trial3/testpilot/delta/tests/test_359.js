let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - handles empty ops array', function(done) {
        let delta = new quill_delta([]);
        
        delta.chop();
        
        assert.deepEqual(delta.ops, []);
        done();
    });

    })