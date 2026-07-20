let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback returns rejected promise', function(done) {
        let callbackError = new Error('callback rejection');
        let originalValue = 'original';
        
        q.finally(q.resolve(originalValue), function() {
            return q.reject(callbackError);
        }).then(function() {
            done(new Error('Promise should have been rejected due to callback rejection'));
        }).catch(function(error) {
            assert.strictEqual(error, callbackError);
            done();
        });
    });
});