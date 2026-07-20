let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys - empty object', function(done) {
        let obj = {};
        let promise = q(obj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys, []);
            done();
        }).catch(done);
    });

    })