let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with complex data types', function(done) {
        let promise = q.makePromise();
        
        let testArray = [1, 2, 3];
        let testFunction = function() { return 'test'; };
        let testDate = new Date();
        
        promise.set('arrayKey', testArray);
        promise.set('functionKey', testFunction);
        promise.set('dateKey', testDate);
        
        assert.deepStrictEqual(promise.arrayKey, testArray);
        assert.strictEqual(promise.functionKey, testFunction);
        assert.strictEqual(promise.dateKey, testDate);
        done();
    });
});