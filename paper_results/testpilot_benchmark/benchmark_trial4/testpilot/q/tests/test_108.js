let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - resolve with value', function(done) {
        const deferred = q.defer();
        const testValue = 'test value';
        
        deferred.promise.then(function(value) {
            assert.equal(value, testValue, 'resolved value should match');
            assert.equal(deferred.promise.inspect().state, 'fulfilled', 'promise should be fulfilled');
            done();
        }).catch(done);
        
        deferred.resolve(testValue);
    });
});