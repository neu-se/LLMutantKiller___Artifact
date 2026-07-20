let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('should return singular form when count is 1', function(done) {
        let result = plural('zebra', 1);
        assert.equal(result, 'zebra');
        done();
    });

    })