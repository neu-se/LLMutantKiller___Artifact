let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with plain values', function(done) {
        q.join(3, 7, function(a, b) {
            return a + b;
        }).then(function(result) {
            assert.equal(result, 10);
            done();
        }).catch(done);
    });
    
    })