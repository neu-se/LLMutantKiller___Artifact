let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill with undefined value', function(done) {
        let promise = q.fulfill(undefined);
        
        promise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });

    })