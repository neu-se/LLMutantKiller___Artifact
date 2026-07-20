let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with function object', function(done) {
        // Test with a simple function
        function add(a, b) {
            return a + b;
        }
        
        q.fapply(add, [3, 4])
            .then(function(result) {
                assert.equal(result, 7);
                done();
            })
            .catch(done);
    });
    
    })