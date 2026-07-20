let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - works with single promise', function(done) {
        let deferred = q.defer();
        let anyPromise = q.all([deferred.promise]).any();
        
        anyPromise.then(function(result) {
            assert.strictEqual(result, 'single');
            done();
        }).catch(done);
        
        deferred.resolve('single');
    });
    
    })