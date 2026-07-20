let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with multiple arguments', function(done) {
        // Create a mock node-style function with multiple parameters
        function nodeStyleFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function(resolver) {
            return function(a, b, c) {
                nodeStyleFunction(a, b, c, resolver);
            };
        });
        
        const denodeified = promise.denodeify();
        
        denodeified(1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
    
    })