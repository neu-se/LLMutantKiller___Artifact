let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with basic numeric values', function(done) {
        // Assuming q has some predefined values to compare against
        // Test finding nearer value to a given number
        let result = q.nearer(5);
        assert(typeof result === 'number', 'Result should be a number');
        done();
    });

    })