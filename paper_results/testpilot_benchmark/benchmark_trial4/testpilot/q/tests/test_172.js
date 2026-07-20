let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle asynchronous resolution', function(done) {
        const promise = q.Promise((resolve) => {
            setTimeout(() => {
                resolve('async result');
            }, 10);
        });
        
        promise.then((value) => {
            assert.strictEqual(value, 'async result');
            done();
        }).catch(done);
    });
});