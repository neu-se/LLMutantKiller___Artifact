let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get handles dispatch rejection', function(done) {
        let promise = q.defer().promise;
        
        promise.dispatch = function(method, args) {
            return q.reject(new Error('dispatch error'));
        };
        
        let result = promise.get('someKey');
        
        result.then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'dispatch error', 'promise should reject with dispatch error');
            done();
        });
    });
});