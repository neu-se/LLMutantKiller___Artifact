let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - basic function binding', function(done) {
        function testFunction(a, b, c) {
            return a + b + c;
        }
        
        let boundFunction = q.fbind(testFunction, 1, 2);
        
        boundFunction(3).then(function(result) {
            assert.equal(result, 6); // 1 + 2 + 3
            done();
        }).catch(done);
    });
});