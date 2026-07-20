let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with all fulfilled promises', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve('hello');
        let promise3 = q.resolve(true);
        
        q.allSettled([promise1, promise2, promise3]).then(function(results) {
            assert.equal(results.length, 3);
            
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 42);
            
            assert.equal(results[1].state, 'fulfilled');
            assert.equal(results[1].value, 'hello');
            
            assert.equal(results[2].state, 'fulfilled');
            assert.equal(results[2].value, true);
            
            done();
        }).catch(done);
    });
    
    })