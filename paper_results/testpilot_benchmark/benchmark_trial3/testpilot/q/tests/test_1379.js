let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with very large values', function(done) {
        let result = q.nearer(1000000);
        assert(result !== undefined, 'Result should be defined for large values');
        done();
    });
});