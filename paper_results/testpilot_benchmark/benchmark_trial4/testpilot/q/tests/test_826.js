let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with non-object value', function(done) {
        let promise = q('string value');
        
        promise.keys().then(function(keys) {
            // String keys would be indices: ['0', '1', '2', ...]
            assert(Array.isArray(keys));
            done();
        }).catch(done);
    });
});