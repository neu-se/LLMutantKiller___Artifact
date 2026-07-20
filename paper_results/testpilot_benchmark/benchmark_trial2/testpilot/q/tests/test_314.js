let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - multiple arguments', function(done) {
        // Create a function that takes multiple arguments
        function nodeStyleFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }

        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(1, 2, 3).then(result => {
            assert.strictEqual(result, 6);
            done();
        }).catch(done);
    });
});