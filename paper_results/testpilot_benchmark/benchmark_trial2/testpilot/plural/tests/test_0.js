let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('should return singular form when num is 1', function(done) {
        let result = plural('cat', 1);
        assert.strictEqual(result, 'cat');
        done();
    });

    })