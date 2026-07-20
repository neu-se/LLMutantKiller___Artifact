let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - handles rejection', function(done) {
        let promise = q.reject(new Error('Test error'));
        
        promise.catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });
});