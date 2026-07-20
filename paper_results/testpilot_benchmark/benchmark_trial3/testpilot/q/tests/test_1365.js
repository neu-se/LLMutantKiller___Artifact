let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer returns consistent results', function(done) {
        let value = 42;
        let result1 = q.nearer(value);
        let result2 = q.nearer(value);
        assert.strictEqual(result1, result2, 'Same input should return same result');
        done();
    });

    })