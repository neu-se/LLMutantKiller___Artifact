let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with function object', function(done) {
        function testFunc(a, b, c) {
            return a + b + c;
        }
        
        let boundFunc = q.fbind(testFunc, 1, 2);
        let result = boundFunc(3);
        
        q.when(result).then(function(value) {
            assert.equal(value, 6);
            done();
        }).catch(done);
    });
    
    })