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

        let promiseObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });

        promiseObject.ninvoke("throwingMethod")
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