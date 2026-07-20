let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should not affect promise chain when tap callback succeeds', function(done) {
        let originalValue = 'test value';
        
        q.resolve(originalValue)
            .tap(function(value) {
                // Do some side effect but don't return anything
                return 'different value';
            })
            .then(function(result) {
                assert.strictEqual(result, originalValue, 'tap should not change the resolved value');
                done();
            })
            .catch(done);
    });

    })