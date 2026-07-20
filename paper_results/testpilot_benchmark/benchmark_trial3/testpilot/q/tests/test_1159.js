let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with error callback', function(done) {
        // Create a mock node-style function that fails
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value < 0) {
                    callback(new Error('Negative value not allowed'));
                } else {
                    callback(null, value * 2);
                }
            }, 10);
        }
        
        // Create a promise using makePromise
        const promise = q.makePromise(nodeStyleFunction, function resolver(resolve, reject) {
            return function(value) {
                nodeStyleFunction(value, function(err, result) {
                    if (err) reject(err);
                    else resolve(result);
                });
            };
        });
        
        // Test the denodeify method with error case
        const denodeified = promise.denodeify();
        
        denodeified(-5)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Negative value not allowed');
                done();
            });
    });

    })