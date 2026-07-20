let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with function that returns promise', function(done) {
        function asyncMultiply(a, b) {
            return q.resolve(a * b);
        }
        
        q.fapply(asyncMultiply, [4, 6])
            .then(function(result) {
                assert.equal(result, 24);
                done();
            })
            .catch(done);
    });
    
    })