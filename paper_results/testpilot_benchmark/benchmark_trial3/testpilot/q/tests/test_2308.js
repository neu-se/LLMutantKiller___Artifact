let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with successful callback', function(done) {
        // Create a mock object with a method that uses Node.js callback pattern
        const mockObject = {
            getData: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === 'valid') {
                        callback(null, 'success data');
                    } else {
                        callback(new Error('Invalid key'));
                    }
                }, 10);
            }
        };

        // Test successful case
        q.npost(mockObject, 'getData', ['valid'])
            .then(result => {
                assert.strictEqual(result, 'success data');
                done();
            })
            .catch(done);
    });

    })