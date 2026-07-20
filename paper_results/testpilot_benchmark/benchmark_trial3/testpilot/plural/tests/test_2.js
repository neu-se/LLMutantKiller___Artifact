let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('should return singular form when num is 1', function(done) {
        assert.equal(plural('zebra', 1), 'zebra');
        assert.equal(plural('cat', 1), 'cat');
        assert.equal(plural('dog', 1), 'dog');
        done();
    });

    })