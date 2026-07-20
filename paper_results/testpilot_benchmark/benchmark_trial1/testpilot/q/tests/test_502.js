let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with regular function', function(done) {
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