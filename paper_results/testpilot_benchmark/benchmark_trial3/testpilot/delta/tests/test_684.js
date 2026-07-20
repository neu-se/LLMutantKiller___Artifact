let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with retain operations', function(done) {
        let delta1 = new Delta([{retain: 5}]);
        let delta2 = new Delta([{retain: 3}, {insert: 'test'}]);
        
        let result = delta1.transform(delta2);
        assert(result instanceof Delta);
        assert.deepStrictEqual(result.ops, [{retain: 3}, {insert: 'test'}]);
        done();
    });

    })