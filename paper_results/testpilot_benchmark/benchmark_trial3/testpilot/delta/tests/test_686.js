let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with mixed operations', function(done) {
        let delta1 = new Delta([{insert: 'Hello'}, {retain: 3}, {delete: 2}]);
        let delta2 = new Delta([{retain: 2}, {insert: ' World'}, {retain: 3}]);
        
        let result = delta1.transform(delta2);
        assert(result instanceof Delta);
        assert(Array.isArray(result.ops));
        done();
    });

    })