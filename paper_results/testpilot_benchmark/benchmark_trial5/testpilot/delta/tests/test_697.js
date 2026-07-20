let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with delete operations', function(done) {
        // Test transforming with delete operations
        let delta1 = new quill_delta([{delete: 5}]);
        let delta2 = new quill_delta([{delete: 3}]);
        
        let result = delta1.transform(delta2, false);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        // Delete operations should be handled according to the transform logic
        done();
    });
});