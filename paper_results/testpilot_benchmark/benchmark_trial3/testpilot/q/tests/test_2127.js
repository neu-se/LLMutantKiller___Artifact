let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise resolves before timeout', function(done) {
        let promise = q.delay(100).then(() => 'success');
        let timeoutPromise = q.timeout(promise, 200);
        
        timeoutPromise.then((result) => {
            assert.equal(result, 'success');
            done();
        }).catch(done);
    });
});