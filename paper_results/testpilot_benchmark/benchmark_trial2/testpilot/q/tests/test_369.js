let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test ninvoke with method that throws synchronously', function(done) {
        let mockObject = {
            throwingMethod: function(callback) {
                throw new Error("Synchronous error");
            }
        };

        q.ninvoke(mockObject, "throwingMethod")
            .then(function() {
                assert.fail("Expected error was not thrown");
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert.equal(error.message, "Synchronous error");
                done();
            })
            .catch(done);
    });
});