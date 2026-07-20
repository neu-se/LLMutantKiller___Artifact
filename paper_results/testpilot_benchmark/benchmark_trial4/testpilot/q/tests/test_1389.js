let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with zero', function(done) {
        let result = q.nearer(0);
        assert(typeof result === 'number', 'Result should be a number');
        assert(result !== null && result !== undefined, 'Result should not be null or undefined');
        done();
    });
});