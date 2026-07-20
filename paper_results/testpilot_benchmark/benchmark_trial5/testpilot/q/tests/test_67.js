let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - first promise rejects', function(done) {
        let promise1 = q.reject(new Error('first error'));
        let promise2 = q.resolve('hello');
        
        promise1.join(promise2).then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'first error');
            done();
        });
    });

    })