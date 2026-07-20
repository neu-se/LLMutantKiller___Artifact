let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with very large numbers', function(done) {
        let result = q.nearer(1000000);
        assert(typeof result === 'number', 'Result should be a number');
        assert(result !== null && result !== undefined, 'Result should not be null or undefined');
        done();
    });
});