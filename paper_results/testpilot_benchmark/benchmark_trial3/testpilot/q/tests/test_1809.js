let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with promised function', function(done) {
        function asyncFunction(x, y) {
            return x * y;
        }
        
        let promisedFunction = q.resolve(asyncFunction);
        
        q.fapply(promisedFunction, [4, 5])
            .then(function(result) {
                assert.equal(result, 20);
                done();
            })
            .catch(done);
    });
    
    })