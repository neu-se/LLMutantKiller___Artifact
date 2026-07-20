let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with callback returning a value', function(done) {
        let originalValue = 'original';
        let callbackReturnValue = 'callback return';
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            return callbackReturnValue; // this return value should be ignored
        }).then(function(result) {
            assert.equal(result, originalValue); // should still get original value, not callback return
            done();
        }).catch(done);
    });
});