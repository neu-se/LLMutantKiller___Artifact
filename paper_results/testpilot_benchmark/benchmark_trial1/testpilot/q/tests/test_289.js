let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with successful callback', function(done) {
        // Create a mock node-style function that succeeds
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Create a promise using makePromise and denodeify
        const promise = q.makePromise(nodeStyleFunction, function(value) {
            return [value];
        });
        const denodeified = promise.denodeify();
        
        denodeified(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });

    })