let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with no arguments', function(done) {
        let promise = q.return();
        promise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });

    })