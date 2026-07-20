let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with negative values', function(done) {
        let result = q.nearer(-10);
        assert(typeof result === 'number', 'Result should be a number');
        done();
    });

    })