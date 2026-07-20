let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with rejection handler', function(done) {
        // Test that rejection handler is called when a promise rejects
        q.all([q.resolve(1), q.reject(new Error('test error'))])
            .spread(
                function(a, b) {
                    // This should not be called
                    assert.fail('Should not reach fulfilled handler');
                },
                function(error) {
                    assert.equal(error.message, 'test error');
                    done();
                }
            )
            .catch(done);
    });

    })