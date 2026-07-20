let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise resolves before timeout', function(done) {
        // Create a promise that resolves after 50ms
        let promise = q.delay(50).then(() => 'success');
        
        // Set timeout to 100ms (longer than resolution time)
        q.timeout(promise, 100)
            .then(result => {
                assert.equal(result, 'success');
                done();
            })
            .catch(done);
    });
});