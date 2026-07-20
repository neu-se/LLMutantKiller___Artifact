let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with undefined value', function(done) {
        let promise = q.return(undefined);
        promise.then(function(value) {
            try {
                assert.strictEqual(value, undefined);
                done();
            } catch (error) {
                done(error);
            }
        }).catch(function(error) {
            done(new Error(error));
        });
    });
});