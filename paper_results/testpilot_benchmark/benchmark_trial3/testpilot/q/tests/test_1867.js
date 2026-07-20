let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with synchronous function', function(done) {
        function add(a, b) {
            return a + b;
        }
        
        let boundAdd = q.fbind(add, 5);
        let result = boundAdd(3);
        
        result.then(function(value) {
            assert.equal(value, 8);
            done();
        }).catch(done);
    });
    
    })