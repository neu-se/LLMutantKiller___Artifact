let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with null reason', function(done) {
        let rejectedPromise = q.Promise.reject(null);
        
        rejectedPromise.catch(function(error) {
            assert.strictEqual(error, null);
            done();
        });
    });
});