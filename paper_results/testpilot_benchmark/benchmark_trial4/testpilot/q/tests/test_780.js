let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenate() {
            return Array.prototype.slice.call(arguments).join(' ');
        }
        
        let promise = q.resolve(concatenate);
        
        promise.fcall('hello', 'world', 'test')
            .then(function(result) {
                assert.strictEqual(result, 'hello world test');
                done();
            })
            .catch(done);
    });

    })