let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve when promise fulfills before timeout', function(done) {
        let promise = q.delay(50).then(() => 'success');
        q.timeout(promise, 100)
            .then(result => {
                assert.equal(result, 'success');
                done();
            })
            .catch(done);
    });
});