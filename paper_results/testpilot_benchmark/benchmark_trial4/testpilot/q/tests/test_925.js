let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with mixed fulfilled and rejected promises', function(done) {
        let fulfilledPromise = q.resolve('success');
        let rejectedPromise = q.reject(new Error('failure'));
        let anotherFulfilledPromise = q.resolve(42);
        
        let promises = [fulfilledPromise, rejectedPromise, anotherFulfilledPromise];
        
        q.allSettled(promises).then(function(results) {
            assert.equal(results.length, 3);
            
            // First promise should be fulfilled
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'success');
            
            // Second promise should be rejected
            assert.equal(results[1].state, 'rejected');
            assert.equal(results[1].reason.message, 'failure');
            
            // Third promise should be fulfilled
            assert.equal(results[2].state, 'fulfilled');
            assert.equal(results[2].value, 42);
            
            done();
        }).catch(done);
    });
    
    })