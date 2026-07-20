let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - rejects when any promise rejects', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.reject(new Error('test error'));
        let promise3 = q.resolve(3);
        
        let mainPromise = q.resolve([promise1, promise2, promise3]);
        
        mainPromise.all().then(function(results) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })