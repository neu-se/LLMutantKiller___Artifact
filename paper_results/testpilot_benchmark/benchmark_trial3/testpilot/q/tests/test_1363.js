let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with decimal values', function(done) {
        let result = q.nearer(3.14);
        assert(typeof result === 'number', 'Result should be a number');
        done();
    });

    })