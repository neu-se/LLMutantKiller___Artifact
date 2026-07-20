let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - no arguments', function(done) {
        // Create a Node.js style function with no parameters except callback
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }

        const denodified = q.denodeify(nodeStyleFunction);
        
        denodified()
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
});