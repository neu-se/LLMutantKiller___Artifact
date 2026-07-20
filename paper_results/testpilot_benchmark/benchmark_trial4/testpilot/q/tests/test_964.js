let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should allow chaining after catch', function(done) {
        let promise = q.reject('original error');
        
        promise.catch(function(error) {
            return 'recovered';
        }).then(function(value) {
            assert.strictEqual(value, 'recovered');
            done();
        });
    });
});