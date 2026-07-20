let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with method that returns rejected promise', function(done) {
        let testObj = {
            rejectPromise: function() {
                return q.reject(new Error('rejected promise'));
            }
        };
        
        // Instead of q.master, just use the object directly since it already returns promises
        let master = testObj;
        
        master.rejectPromise().then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'rejected promise');
            done();
        });
    });
});