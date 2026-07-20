let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with multiple values', function(done) {
        q.join(1, 2, 3, function(a, b, c) {
            return a + b + c;
        }).then(function(result) {
            assert.equal(result, 6);
            done();
        }).catch(done);
    });
    
    })