let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback throws error', function(done) {
        let callbackError = new Error('callback error');
        let originalValue = 'original';
        
        q.finally(q.resolve(originalValue), function() {
            throw callbackError;
        }).then(function() {
            done(new Error('Promise should have been rejected due to callback error'));
        }).catch(function(error) {
            assert.strictEqual(error, callbackError);
            done();
        });
    });
});