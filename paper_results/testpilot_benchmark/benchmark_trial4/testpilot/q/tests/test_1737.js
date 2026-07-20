let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete with object that rejects delete dispatch', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                return q.reject(new Error('Delete operation failed'));
            }
        };

        q.delete(mockObject, 'anykey')
            .then(function(result) {
                done(new Error('Expected promise to be rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Delete operation failed');
                done();
            });
    });

    })