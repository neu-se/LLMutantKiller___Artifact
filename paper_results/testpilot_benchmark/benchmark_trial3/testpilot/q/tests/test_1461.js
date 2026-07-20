let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill with null value', function(done) {
        let promise = q.fulfill(null);
        
        promise.then(function(value) {
            assert.strictEqual(value, null);
            done();
        }).catch(done);
    });

    })