let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with null value', function(done) {
        let promise = q.return(null);
        promise.then(function(value) {
            assert.strictEqual(value, null);
            done();
        }).catch(done);
    });

    })