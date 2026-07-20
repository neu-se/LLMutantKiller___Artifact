let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with function that returns promise', function(done) {
        let promise = q.resolve(3);
        let joinFunction = function(value) {
            return q.resolve(value + 7);
        };
        
        q.join(promise, joinFunction)
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });

    })