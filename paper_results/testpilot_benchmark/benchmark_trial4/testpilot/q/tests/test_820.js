let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys - promise resolving to object', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys.sort(), ['x', 'y', 'z']);
            done();
        }).catch(done);
        
        // Resolve the promise after setting up the keys() call
        setTimeout(function() {
            deferred.resolve({ x: 1, y: 2, z: 3 });
        }, 10);
    });
});