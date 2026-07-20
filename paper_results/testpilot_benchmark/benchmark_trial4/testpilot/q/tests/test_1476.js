let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - post method applies function when name is null', function(done) {
        let testFunc = function(a, b) {
            return a + b;
        };
        let promise = q.fulfill(testFunc);
        
        let result = promise.post(null, [5, 7]);
        
        assert.strictEqual(result, 12);
        done();
    });

    })