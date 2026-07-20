let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with resolved promise and function', function(done) {
        let promise = q.resolve(5);
        let joinFunction = function(value) {
            return value * 2;
        };
        
        q.join(promise, joinFunction)
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });

    })