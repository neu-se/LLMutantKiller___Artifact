let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - with undefined value', function(done) {
        q.resolve(undefined)
            .delay(25)
            .then(function(value) {
                assert.strictEqual(value, undefined, 'Undefined value should be preserved');
                done();
            }).catch(done);
    });
});