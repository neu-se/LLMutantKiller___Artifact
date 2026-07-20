let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - zero delay', function(done) {
        const promise = q.resolve('immediate');
        promise.delay(0).then(function(value) {
            assert.strictEqual(value, 'immediate', 'Promise value should be preserved with zero delay');
            done();
        }).catch(done);
    });

    })