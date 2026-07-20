let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with empty delta', function(done) {
        let delta1 = new Delta().insert('Test');
        let delta2 = new Delta();
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        assert.equal(transformed.ops.length, 0);
        done();
    });

    })