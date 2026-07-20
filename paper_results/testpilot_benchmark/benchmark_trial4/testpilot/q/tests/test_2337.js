let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with no additional arguments', function(done) {
        // Create a mock object with a method that takes only a callback
        const mockObject = {
            getStatus: function(callback) {
                setTimeout(() => {
                    callback(null, 'ready');
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'getStatus')
            .then(result => {
                assert.strictEqual(result, 'ready');
                done();
            })
            .catch(done);
    });

    })