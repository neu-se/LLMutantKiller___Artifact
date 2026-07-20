let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString is a function', function(done) {
        let promise = q.defer().promise;
        
        // Test that toString is a function
        assert.strictEqual(typeof promise.toString, 'function');
        done();
    });

    })