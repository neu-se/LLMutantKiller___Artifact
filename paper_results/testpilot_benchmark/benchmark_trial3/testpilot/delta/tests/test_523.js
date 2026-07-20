let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - text deletion', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello World'}]);
        let delta2 = new quill_delta([{retain: 5}, {delete: 6}]);
        let result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello'}]);
        done();
    });

    })