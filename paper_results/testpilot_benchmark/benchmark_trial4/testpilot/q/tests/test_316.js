let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with same primitive values', function(done) {
        q.join(5, 5).then(function(result) {
            assert.strictEqual(result, 5);
            done();
        }).catch(done);
    });
});