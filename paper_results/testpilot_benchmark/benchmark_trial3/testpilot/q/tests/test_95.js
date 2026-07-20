let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - promise chaining', function(done) {
        const deferred = q.defer();
        
        deferred.promise
            .then(function(value) {
                return value * 2;
            })
            .then(function(value) {
                assert.equal(value, 20, 'chained promise should transform value');
                done();
            })
            .catch(done);
        
        deferred.resolve(10);
    });
});