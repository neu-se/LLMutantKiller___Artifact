let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with delete operations', function(done) {
        let delta1 = new Delta().insert('Hello World').delete(5);
        let delta2 = new Delta().retain(6).insert('Beautiful ');
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        done();
    });

    })