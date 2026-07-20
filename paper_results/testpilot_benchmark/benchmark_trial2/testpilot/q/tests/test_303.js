let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with multiple arguments', function(done) {
        // Create a mock node-style function that returns multiple values
        function nodeStyleFunction(a, b, callback) {
            setTimeout(() => {
                callback(null, a + b, a * b);
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function() {
            return Array.prototype.slice.call(arguments);
        });
        
        const denodeified = promise.denodeify();
        
        denodeified(3, 4).then(function(result) {
            // When multiple values are returned, only the first is typically used
            assert.strictEqual(result, 7);
            done();
        }).catch(done);
    });
    
    })