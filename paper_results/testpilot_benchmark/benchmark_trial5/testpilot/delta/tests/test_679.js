let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with priority true', function(done) {
        let delta1 = new Delta().insert('A');
        let delta2 = new Delta().insert('B');
        
        let transformedWithPriority = delta1.transform(delta2, true);
        let transformedWithoutPriority = delta1.transform(delta2, false);
        
        assert(transformedWithPriority instanceof Delta);
        assert(transformedWithoutPriority instanceof Delta);
        done();
    });

    })