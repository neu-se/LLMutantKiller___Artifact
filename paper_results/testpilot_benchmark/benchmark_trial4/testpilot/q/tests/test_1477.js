let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - apply method calls function with context', function(done) {
        let testFunc = function(a, b) {
            return this.multiplier * (a + b);
        };
        let context = { multiplier: 2 };
        let promise = q.fulfill(testFunc);
        
        let result = promise.apply(context, [3, 4]);
        
        assert.strictEqual(result, 14);
        done();
    });

    })