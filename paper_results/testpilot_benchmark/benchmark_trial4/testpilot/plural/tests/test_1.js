let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('should return original word when num is 1', function(done) {
        assert.equal(plural('cat', 1), 'cat');
        assert.equal(plural('dog', 1), 'dog');
        assert.equal(plural('house', 1), 'house');
        done();
    });

    })