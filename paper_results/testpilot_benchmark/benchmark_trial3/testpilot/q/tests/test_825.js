let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with empty object', function(done) {
        let testObj = {};
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert(Array.isArray(keys), 'keys should return an array');
            assert.equal(keys.length, 0, 'empty object should return empty array');
            done();
        }).catch(done);
    });

    })