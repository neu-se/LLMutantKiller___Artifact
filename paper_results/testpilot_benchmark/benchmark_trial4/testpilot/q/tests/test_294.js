let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('test error'));
        let joinFunction = function(value) {
            return value;
        };
        
        q.join(rejectedPromise, joinFunction)
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });

    })