let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - second promise rejects', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.reject(new Error('second error'));
        
        promise1.join(promise2).then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'second error');
            done();
        });
    });

    })