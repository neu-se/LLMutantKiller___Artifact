let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with function that returns value', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise that resolves to the function
        let promise = q.resolve(add);
        
        // Call fcall with arguments
        promise.fcall(5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });

    })