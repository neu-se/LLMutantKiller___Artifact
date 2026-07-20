let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with basic numeric values', function(done) {
        // Assuming q has some predefined values to compare against
        // Test finding nearest to a specific value
        let result = q.nearer(5);
        assert(typeof result !== 'undefined', 'nearer should return a value');
        assert(typeof result === 'number' || typeof result === 'object', 'result should be numeric or object');
        done();
    });

    })