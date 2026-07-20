let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise resolves before timeout', function(done) {
        // Create a promise that resolves after 100ms
        let promise = q.delay(100).then(() => 'success');
        
        // Set timeout to 200ms (longer than promise resolution time)
        q.timeout(promise, 200)
            .then(result => {
                assert.equal(result, 'success');
                done();
            })
            .catch(done);
    });
});