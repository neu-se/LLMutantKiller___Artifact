let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with delete operations', function(done) {
        let delta1 = new Delta().insert('Hello World');
        let delta2 = new Delta().retain(5).delete(1);
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        done();
    });

    })