let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with values and promises mixed', function(done) {
        let promise1 = q.resolve(5);
        let value2 = 15;
        
        q.join(promise1, value2, function(a, b) {
            return a * b;
        }).then(function(result) {
            assert.equal(result, 75);
            done();
        }).catch(done);
    });
    
    })