let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with retain operations', function(done) {
        // Test transforming with retain operations
        let delta1 = new quill_delta([{retain: 5}]);
        let delta2 = new quill_delta([{retain: 3}]);
        
        let result = delta1.transform(delta2, false);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        assert(Array.isArray(result.ops), 'Should have ops array');
        done();
    });
});