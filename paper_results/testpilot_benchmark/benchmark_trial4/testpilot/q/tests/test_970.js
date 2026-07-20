let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - catches rejection', function(done) {
        let promise = q.reject(new Error('Test error'));
        
        promise.catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});