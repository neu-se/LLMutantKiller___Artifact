let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback returning rejected promise', function(done) {
        let callbackError = new Error('finally callback rejection');
        
        q.finally(q.resolve('original value'), function() {
            return q.reject(callbackError);
        }).then(function() {
            done(new Error('Promise should have been rejected due to finally callback rejection'));
        }).catch(function(error) {
            assert.strictEqual(error, callbackError);
            done();
        });
    });

    })