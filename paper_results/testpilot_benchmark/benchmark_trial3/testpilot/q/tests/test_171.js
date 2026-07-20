let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle asynchronous rejection', function(done) {
        const promise = q.Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('async error'));
            }, 10);
        });
        
        promise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch((error) => {
            assert.strictEqual(error.message, 'async error');
            done();
        });
    });
});