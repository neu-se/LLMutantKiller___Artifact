let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with no callback', function(done) {
        let originalValue = 'test value';
        
        let promise = q.resolve(originalValue);
        
        promise.finally().then(function(value) {
            assert.strictEqual(value, originalValue, 'value should be preserved when no callback provided');
            done();
        }).catch(done);
    });
});