let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with a string value', function(done) {
        let promise = q('hello world');
        promise.then(function(result) {
            assert.strictEqual(result, 'hello world');
            done();
        }).catch(done);
    });

    })