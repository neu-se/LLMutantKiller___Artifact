let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - resolves with first resolved value', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        let anyPromise = q.all(promises).any();
        
        anyPromise.then(function(result) {
            assert.strictEqual(result, 'second');
            done();
        }).catch(done);
        
        // Resolve second promise first
        setTimeout(() => deferred2.resolve('second'), 10);
        setTimeout(() => deferred1.resolve('first'), 20);
        setTimeout(() => deferred3.resolve('third'), 30);
    });
    
    })