let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test passByCopy with already resolved promise', function(done) {
        let resolvedPromise = q.resolve('already resolved');
        let passByCopyPromise = resolvedPromise.passByCopy();
        
        assert(q.isPromise(passByCopyPromise), 'passByCopy should return a promise');
        
        passByCopyPromise.then(function(value) {
            assert.strictEqual(value, 'already resolved', 'Should preserve resolved value');
            done();
        }).catch(done);
    });
});