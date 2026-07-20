let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should return undefined (no return value)', function() {
            let promise = q.resolve('test');
            let result = promise.done();
            assert.equal(result, undefined);
        });

    })
})