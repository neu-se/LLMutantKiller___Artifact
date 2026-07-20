let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with string value', function(done) {
        let promise = q.return('hello world');
        promise.then(function(value) {
            assert.strictEqual(value, 'hello world');
            done();
        }).catch(done);
    });

    })