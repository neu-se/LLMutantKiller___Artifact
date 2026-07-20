let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with undefined value', function(done) {
        let promise = q(undefined);
        promise.then(function(result) {
            assert.strictEqual(result, undefined);
            done();
        }).catch(done);
    });

    })