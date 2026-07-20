let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with immediate function', function(done) {
        // Test with a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        q.fapply(add, [3, 5])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
    
    })