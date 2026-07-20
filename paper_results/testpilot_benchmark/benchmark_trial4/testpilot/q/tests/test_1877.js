let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with promise as object', function(done) {
        function multiply(a, b) {
            return a * b;
        }
        
        let promisedFunction = q.resolve(multiply);
        let boundMultiply = q.fbind(promisedFunction, 4);
        let result = boundMultiply(7);
        
        result.then(function(value) {
            assert.equal(value, 28);
            done();
        }).catch(done);
    });
    
    })