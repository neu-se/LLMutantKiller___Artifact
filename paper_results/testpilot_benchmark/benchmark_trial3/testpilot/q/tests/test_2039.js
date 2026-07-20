let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback throwing error', function(done) {
        let callbackError = new Error('finally callback error');
        
        q.finally(q.resolve('original value'), function() {
            throw callbackError;
        }).then(function() {
            done(new Error('Promise should have been rejected due to finally callback error'));
        }).catch(function(error) {
            assert.strictEqual(error, callbackError);
            done();
        });
    });
});