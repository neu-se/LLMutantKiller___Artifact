let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - fulfill with value', function(done) {
        const deferred = q.defer();
        const testValue = 42;
        
        deferred.promise.then(function(value) {
            assert.equal(value, testValue, 'fulfilled value should match');
            done();
        }).catch(done);
        
        deferred.fulfill(testValue);
    });

    })