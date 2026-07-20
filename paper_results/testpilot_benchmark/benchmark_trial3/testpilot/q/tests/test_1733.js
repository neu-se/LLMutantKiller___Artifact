let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete with plain object (no dispatch method)', function(done) {
        let plainObject = { key1: 'value1' };

        q.delete(plainObject, 'key1')
            .then(function(result) {
                done(new Error('Expected promise to be rejected'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});