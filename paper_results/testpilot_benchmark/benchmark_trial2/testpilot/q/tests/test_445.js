let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with undefined value', function(done) {
        let promise = q.resolve(undefined);
        promise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(function(error) {
            done(new Error(error));
        });
    });
});