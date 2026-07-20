let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle notify function without errors', function(done) {
        const promise = q.Promise((resolve, reject, notify) => {
            notify('progress update');
            resolve('completed');
        });
        
        promise.then((value) => {
            assert.strictEqual(value, 'completed');
            done();
        }).catch(done);
    });
});