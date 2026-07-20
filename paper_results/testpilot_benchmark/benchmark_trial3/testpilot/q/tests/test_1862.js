let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with promise-returning function', function(done) {
        function asyncMultiply(a, b) {
            return q.resolve(a * b);
        }
        
        let boundMultiply = q.fbind(asyncMultiply, 4);
        let result = boundMultiply(7);
        
        q.when(result).then(function(value) {
            assert.equal(value, 28);
            done();
        }).catch(done);
    });
    
    })