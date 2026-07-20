let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - no arguments', function(done) {
        // Create a Node.js style function with no parameters except callback
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }

        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        const denodified = promise.denodeify(nodeStyleFunction);
        
        denodified()
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
});