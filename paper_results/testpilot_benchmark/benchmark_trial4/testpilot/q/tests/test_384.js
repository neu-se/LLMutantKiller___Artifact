let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - with non-promise value', function(done) {
        let promise1 = q.resolve(42);
        let nonPromise = 'not a promise';
        
        promise1.join(nonPromise).then(function(results) {
            assert.strictEqual(results[0], 42);
            assert.strictEqual(results[1], 'not a promise');
            done();
        }).catch(done);
    });
});