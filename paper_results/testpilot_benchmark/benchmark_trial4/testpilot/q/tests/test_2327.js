let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with method that throws synchronously', function(done) {
        const mockObject = {
            throwingMethod: function(callback) {
                throw new Error('Synchronous error');
            }
        };

        q.ninvoke(mockObject, 'throwingMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Synchronous error');
                done();
            });
    });
});