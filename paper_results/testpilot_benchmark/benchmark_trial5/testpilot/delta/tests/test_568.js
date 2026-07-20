let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with single operation delta', function(done) {
        const delta1 = new quill_delta([{retain: 5}]);
        const delta2 = new quill_delta([{delete: 3}]);
        
        const result = delta1.concat(delta2);
        
        assert.deepEqual(result.ops, [{retain: 5}, {delete: 3}]);
        done();
    });

    })