let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with zero', function(done) {
        let result = q.nearer(0);
        assert(result !== undefined, 'Result should not be undefined');
        assert(result !== null, 'Result should not be null');
        done();
    });
});