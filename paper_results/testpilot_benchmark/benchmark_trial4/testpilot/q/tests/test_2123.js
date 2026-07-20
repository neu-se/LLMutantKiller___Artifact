let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should reject when promise takes longer than timeout', function(done) {
        let promise = q.delay(100).then(() => 'success');
        
        q.timeout(promise, 50)
            .then(() => {
                done(new Error('Should have timed out'));
            })
            .catch(error => {
                assert(error.message.includes('Timed out'));
                done();
            });
    });
});