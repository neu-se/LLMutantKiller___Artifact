let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - resolve with value', function(done) {
        let deferred = q.defer();
        let testValue = 'test result';
        
        deferred.promise.then(function(result) {
            assert.equal(result, testValue, 'promise should resolve with the correct value');
            done();
        }).catch(done);
        
        deferred.resolve(testValue);
    });
});