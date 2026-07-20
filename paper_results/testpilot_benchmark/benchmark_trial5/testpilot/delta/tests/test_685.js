let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with priority true', function(done) {
        // Test transform with priority = true
        let delta1 = new quill_delta([{insert: 'A'}]);
        let delta2 = new quill_delta([{insert: 'B'}]);
        
        let result = delta1.transform(delta2, true);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        assert.deepEqual(result.ops, [{insert: 'B'}], 'Should handle priority correctly');
        done();
    });

    })