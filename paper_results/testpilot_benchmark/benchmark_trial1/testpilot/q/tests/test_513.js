let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - basic function binding', function(done) {
        function testFunction(a, b, c) {
            return this.value + a + b + c;
        }
        
        let obj = { value: 10 };
        let boundFunction = q.fbind(testFunction, obj, 1, 2);
        
        boundFunction(3).then(function(result) {
            assert.equal(result, 16); // 10 + 1 + 2 + 3
            done();
        }).catch(done);
    });
    
    })