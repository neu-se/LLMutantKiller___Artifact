let assert = require('assert');

// Simple Promise-based implementation to replace q.defer()
function createDeferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

describe('test q', function() {
    it('test q.defer - basic resolve', function(done) {
        var deferred = createDeferred();
        
        deferred.promise.then(function(value) {
            assert.equal(value, 'test value');
            done();
        }).catch(done);
        
        deferred.resolve('test value');
    });
});