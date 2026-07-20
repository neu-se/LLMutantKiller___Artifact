let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with primitive value', function(done) {
        let promise = q.return(42);
        promise.then(function(value) {
            assert.strictEqual(value, 42);
            done();
        }).catch(function(error) {
            done(new Error('Promise rejected unexpectedly: ' + JSON.stringify(error)));
        });
    });
});