let assert = require('assert');

describe('test promises', function() {
    it('test rejection with chained promises', function(done) {
        let chainedRejected = Promise.resolve('initial')
            .then(() => {
                throw new Error('Chain error');
            });
        
        setTimeout(() => {
            // Check if the promise is rejected by using catch
            chainedRejected.catch((error) => {
                assert.strictEqual(error.message, 'Chain error', 'Chained promise should reject with the expected error');
                done();
            });
        }, 0);
    });
});