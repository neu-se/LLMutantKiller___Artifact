let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill with string value', function(done) {
        let promise = q.fulfill('hello world');
        
        promise.then(function(value) {
            assert.strictEqual(value, 'hello world');
            done();
        }).catch(done);
    });

    })